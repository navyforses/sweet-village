/**
 * Prints the scrypt hash to store in the ADMIN_PASSWORD_HASH environment
 * variable. Run with `pnpm admin:hash-password`. The password is read from
 * the ADMIN_PASSWORD variable or from a hidden terminal prompt — never from
 * the command line, so it does not end up in shell history.
 */
import { createInterface } from "node:readline";
import { Writable } from "node:stream";
import { hashPassword, verifyPassword } from "../api/_lib/adminAuth";

const MIN_LENGTH = 10;

function promptHidden(question: string): Promise<string> {
  return new Promise(resolve => {
    const muted = new Writable({
      write(_chunk, _encoding, callback) {
        callback();
      },
    });
    const rl = createInterface({ input: process.stdin, output: muted, terminal: true });
    process.stdout.write(question);
    rl.question("", answer => {
      process.stdout.write("\n");
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  let password = process.env.ADMIN_PASSWORD ?? "";
  if (!password) {
    password = await promptHidden("ადმინის პაროლი: ");
    const again = await promptHidden("გაიმეორეთ პაროლი: ");
    if (password !== again) {
      console.error("პაროლები არ ემთხვევა.");
      process.exit(1);
    }
  }
  if (password.length < MIN_LENGTH) {
    console.error(`პაროლი მინიმუმ ${MIN_LENGTH} სიმბოლო უნდა იყოს.`);
    process.exit(1);
  }
  const hash = hashPassword(password);
  if (!(await verifyPassword(password, hash))) {
    console.error("ჰეშის შემოწმება ვერ მოხერხდა.");
    process.exit(1);
  }
  console.log("\nADMIN_PASSWORD_HASH (ჩასვით Vercel-ის Environment Variables-ში; CLI-ში აუცილებლად ერთმაგ ბრჭყალებში, რადგან $ სიმბოლოს შეიცავს):\n");
  console.log(hash);
  console.log("\nსესიის საიდუმლო (ADMIN_SESSION_SECRET) ცალკე შექმენით: openssl rand -base64 48\n");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
