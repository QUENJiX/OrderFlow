import { describe, expect, it } from "vitest";
import { buildCourierCsv } from "./csv";
import { demoOrders, demoProducts } from "./seed";

describe("buildCourierCsv", () => {
  it("creates a generic courier CSV with expected columns", () => {
    const csv = buildCourierCsv([demoOrders[0]], demoProducts);

    expect(csv.split("\n")[0]).toBe(
      "customer_name,phone,address,district,area,product_name,quantity,cod_amount,delivery_charge,merchant_invoice_id,note"
    );
    expect(csv).toContain("Tasmia Rahman");
    expect(csv).toContain("Linen Kurti");
    expect(csv).toContain("1530");
  });

  it("escapes commas, quotes, and newlines", () => {
    const order = {
      ...demoOrders[0],
      id: "ord_escape",
      customer: {
        ...demoOrders[0].customer,
        name: 'Ayesha "Apu"',
        address: "House 7, Road 2\nBanani"
      },
      customerNotes: 'Gift wrap, write "Eid"'
    };

    const csv = buildCourierCsv([order], demoProducts);

    expect(csv).toContain('"Ayesha ""Apu"""');
    expect(csv).toContain('"House 7, Road 2 Banani"');
    expect(csv).toContain('"Gift wrap, write ""Eid"""');
  });
});
