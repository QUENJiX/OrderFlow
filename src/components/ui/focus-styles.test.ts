import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const files = [
  "button.tsx",
  "checkbox.tsx",
  "dialog.tsx",
  "input.tsx",
  "select.tsx",
  "sheet.tsx",
  "switch.tsx",
  "tabs.tsx",
  "textarea.tsx"
];

describe("shared UI focus styles", () => {
  it("does not add visible focus rings or ring-colored borders", () => {
    for (const file of files) {
      const source = readFileSync(
        fileURLToPath(new URL(`./${file}`, import.meta.url)),
        "utf8"
      );

      expect(source, file).not.toMatch(/focus(?:-visible)?:ring/);
      expect(source, file).not.toMatch(/focus(?:-visible)?:border-ring/);
    }
  });
});
