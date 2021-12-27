// Add zero in front of numbers < 10
export function zeroPad(i: number): string {
  return i < 10 ? "0" + i : i.toString();
}

// Format hours to 12h or 24h
export function formatHours(hours: number, clockDisplay: "12h" | "24h"): string {
  let formatedHours: string;

  if (clockDisplay === "12h") {
    // 12h format
    formatedHours = (hours % 12).toString() || "12";
  } else {
    // 24h format
    formatedHours = zeroPad(hours);
  }

  return formatedHours
}
