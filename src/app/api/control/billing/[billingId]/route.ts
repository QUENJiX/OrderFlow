import { handleApiError, ok } from "@/lib/api/responses";
import { requirePlatformAdmin } from "@/lib/auth/session";
import type { BillingRecordPatch } from "@/lib/domain/types";

type ControlBillingInput = {
  notes?: string;
  status?: BillingRecordPatch["status"];
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ billingId: string }> }
) {
  try {
    const { billingId } = await context.params;
    const { repo } = await requirePlatformAdmin();
    const input = (await request.json().catch(() => ({}))) as ControlBillingInput;
    const billing = await repo.updateBillingRecord(billingId, {
      notes: input.notes,
      status: input.status
    });

    return ok(billing);
  } catch (error) {
    return handleApiError(error);
  }
}
