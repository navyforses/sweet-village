import { describe, expect, it } from "vitest";
import bookingHandler from "./booking";

function responseRecorder() {
  const record = { statusCode: 0, body: undefined as unknown, headers: new Map<string, string>() };
  const response = {
    setHeader(name: string, value: string) {
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

describe("Vercel booking endpoint", () => {
  it("only accepts POST requests", async () => {
    const { record, response } = responseRecorder();
    await bookingHandler({ method: "GET" }, response);
    expect(record.statusCode).toBe(405);
    expect(record.headers.get("Allow")).toBe("POST");
  });

  it("rejects malformed public booking data before calling any service", async () => {
    const { record, response } = responseRecorder();
    await bookingHandler({ method: "POST", body: { name: "A", phone: "invalid" } }, response);
    expect(record.statusCode).toBe(422);
    expect(record.body).toEqual({ error: "Invalid booking request" });
  });
});
