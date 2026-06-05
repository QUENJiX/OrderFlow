import { NextResponse } from "next/server";
import { RepositoryValidationError } from "../store";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function fail(
  error: string,
  init?: ResponseInit & { fieldErrors?: Record<string, string> }
) {
  return NextResponse.json(
    {
      ok: false,
      error,
      fieldErrors: init?.fieldErrors
    },
    {
      status: init?.status ?? 400,
      headers: init?.headers
    }
  );
}

export function activeShopMissing() {
  return fail(
    "No merchant shop is available for this account. Create a shop from /merchant/setup or add the user to shop_members.",
    { status: 409 }
  );
}

export function handleApiError(error: unknown) {
  if (error instanceof RepositoryValidationError) {
    return fail("Validation failed", {
      status: 422,
      fieldErrors: error.fieldErrors
    });
  }

  if (error instanceof Error) {
    return fail(error.message, { status: 400 });
  }

  return fail("Unexpected server error", { status: 500 });
}
