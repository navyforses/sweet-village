/**
 * Test double for the Neon tagged-template client. Tests decide what each
 * query returns by inspecting the SQL text; every call is recorded so
 * assertions can check what was written.
 */
export type FakeRow = Record<string, unknown>;
export type FakeQueryHandler = (query: string, values: unknown[]) => FakeRow[] | Promise<FakeRow[]>;

export interface FakeSqlCall {
  query: string;
  values: unknown[];
}

export function createFakeSql(handler: FakeQueryHandler) {
  const calls: FakeSqlCall[] = [];
  const sql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const query = strings.join("?").replace(/\s+/g, " ").trim();
    calls.push({ query, values });
    return handler(query, values);
  };
  return { sql, calls };
}

export function responseRecorder() {
  const record = { statusCode: 0, body: undefined as unknown, headers: new Map<string, string | string[]>() };
  const response = {
    setHeader(name: string, value: string | string[]) {
      record.headers.set(name, value);
    },
    status(code: number) {
      record.statusCode = code;
      return response;
    },
    json(body: unknown) {
      record.body = body;
    },
  };
  return { record, response };
}
