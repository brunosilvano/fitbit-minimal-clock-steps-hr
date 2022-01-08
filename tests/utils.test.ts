import { formatHours, zeroPad } from "../common/utils";

// formatHours
describe("formatHours", () => {
  // 12h
  describe("to 12h", () => {
    test("should format 3 to 3", () => {
      expect(formatHours(3, "12h")).toBe("3");
    });

    test("should format 12 to 12", () => {
      expect(formatHours(3, "12h")).toBe("3");
    });

    test("should format 13 to 1", () => {
      expect(formatHours(3, "12h")).toBe("3");
    });

    test("should format 24 to 0", () => {
      expect(formatHours(3, "12h")).toBe("3");
    });
  });

  // 24h
  describe("to 24h", () => {
    test("should format 3 to 3", () => {
      expect(formatHours(3, "12h")).toBe("3");
    });

    test("should format 12 to 12", () => {
      expect(formatHours(3, "12h")).toBe("3");
    });

    test("should format 13 to 13", () => {
      expect(formatHours(3, "12h")).toBe("3");
    });

    test("should format 24 to 0", () => {
      expect(formatHours(3, "12h")).toBe("3");
    });
  });
});
