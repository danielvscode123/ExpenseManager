import { describe, it, expect } from "vitest";
import { labelForCategory, categoryOptions } from "@/lib/categories";

describe("category utilities", () => {
  it("should return a human label for known category", () => {
    const { value, label } = categoryOptions[0];
    expect(labelForCategory(value)).toBe(label);
  });

  it("should fallback to the key when unknown", () => {
    expect(labelForCategory("nonexistent")).toBe("nonexistent");
  });
});
