import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./page.tsx", import.meta.url)), "utf8");

describe("LandingPage source", () => {
  it("keeps the secondary control login action hidden on narrow screens", () => {
    expect(source).toMatch(
      /<Button asChild className="hidden sm:inline-flex" variant="ghost">\s*<Link href="\/control\/login">Control login<\/Link>\s*<\/Button>/
    );
  });
});
