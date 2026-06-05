type CalculateOrderTotalsInput = {
  price: number;
  deliveryCharge: number;
  quantity: number;
};

export function calculateOrderTotals({
  price,
  deliveryCharge,
  quantity
}: CalculateOrderTotalsInput) {
  const safeQuantity = Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
  const subtotal = price * safeQuantity;

  return {
    subtotal,
    deliveryCharge,
    total: subtotal + deliveryCharge
  };
}

export function formatBdt(amount: number) {
  return `BDT ${Math.round(amount).toLocaleString("en-US")}`;
}
