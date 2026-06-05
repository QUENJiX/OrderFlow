import { ok } from "@/lib/api/responses";

export async function GET() {
  return ok({
    status: "ok",
    app: "OrderFlow BD",
    mode: "local-demo",
    persistence: "in-memory",
    timestamp: new Date().toISOString()
  });
}
