import { formatHours, zeroPad } from "../common/utils";

// formatHours
describe("formatHours", () => {
  // 12h
  describe("to 12h", () => {
    test("should format 3 to 3", () => {
      expect(formatHours(3, "12h")).toBe("3");
    });

    test("should format 12 to 12", () => {
      expect(formatHours(12, "12h")).toBe("12");
    });

    test("should format 13 to 1", () => {
      expect(formatHours(13, "12h")).toBe("1");
    });
  });

  // 24h
  describe("to 24h", () => {
    test("should format 3 to 3", () => {
      expect(formatHours(3, "24h")).toBe("03");
    });

    test("should format 12 to 12", () => {
      expect(formatHours(12, "24h")).toBe("12");
    });

    test("should format 13 to 13", () => {
      expect(formatHours(13, "24h")).toBe("13");
    });
  });
});

// zeroPad
describe("zeroPad", () => {
  test("should add 0 padding to numbers below 10", () => {
    expect(zeroPad(0)).toBe("00");
    expect(zeroPad(1)).toBe("01");
  });

  test("should NOT add 0 padding to numbers above 10", () => {
    expect(zeroPad(10)).toBe("10");
    expect(zeroPad(20)).toBe("20");
    expect(zeroPad(100)).toBe("100");
  });
});
