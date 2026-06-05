import { fail, ok } from "@/lib/api/responses";

const defaultVerifyToken = "orderflow-local-verify-token";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const expectedToken = process.env.META_VERIFY_TOKEN || defaultVerifyToken;

  if (mode === "subscribe" && token === expectedToken && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }

  return fail("Meta webhook verification failed", { status: 403 });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));

  return ok(
    {
      received: true,
      recorded: false,
      reason:
        "Meta page to shop mapping is not configured yet. Merchant-owned test events are available at /api/meta/test.",
      preview: JSON.stringify(payload).slice(0, 500)
    },
    { status: 202 }
  );
}
