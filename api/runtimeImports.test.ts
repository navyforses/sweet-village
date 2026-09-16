import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import { expect, it } from "vitest";

it("loads emitted Vercel entrypoints in native Node ESM without a bundler", () => {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const cache = join(root, "node_modules", ".cache");
  mkdirSync(cache, { recursive: true });
  const output = mkdtempSync(join(cache, "vercel-esm-"));
  try {
    writeFileSync(join(output, "package.json"), JSON.stringify({ type: "module" }));
    function emit(directory: string) {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const source = join(directory, entry.name);
        if (entry.isDirectory()) {
          emit(source);
        } else if (source.endsWith(".ts") && !source.endsWith(".test.ts")) {
          const destination = join(output, relative(root, source).replace(/\.ts$/, ".js"));
          mkdirSync(dirname(destination), { recursive: true });
          const compiled = ts.transpileModule(readFileSync(source, "utf8"), {
            compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
          });
          writeFileSync(destination, compiled.outputText);
        }
      }
    }
    emit(join(root, "api"));
    emit(join(root, "shared"));
    const entrypoints = ["api/admin/[action].js", "api/content.js", "api/booking.js"];
    const imports = entrypoints.map(entry => `await import(${JSON.stringify(pathToFileURL(join(output, entry)).href)});`).join("\n");
    const result = execFileSync(process.execPath, ["--input-type=module", "-e", `${imports}\nconsole.log('runtime imports OK');`], {
      cwd: root,
      encoding: "utf8",
      timeout: 15_000,
    });
    expect(result.trim()).toBe("runtime imports OK");
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
}, 20_000);
