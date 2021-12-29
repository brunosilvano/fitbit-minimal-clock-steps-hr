import clock from "clock";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import document from "document";
import { preferences } from "user-settings";
import { formatHours, zeroPad } from "../common/utils";

// Interface for holding multiple sensors references
interface ISensors {
  hrm?: HeartRateSensor,
}

// Globals
const sensors: ISensors = {};   // holds used sensors references

// Get references to UI elements
const clockUIElement = document.getElementById("clockText");
const heartRateUIElement = document.getElementById("heartRateText");

//// Clock
// Clock settings
clock.granularity = "minutes";

clock.ontick = ev => {
  // Get clock values
  let today = ev.date;
  let hours = today.getHours();
  let minutes = today.getMinutes();

  // Format display time
  let formattedTime = `${formatHours(hours, preferences.clockDisplay)}:${zeroPad(minutes)}`;

  // Update value of text
  clockUIElement.text = formattedTime;
}

//// Heart-rate
if (HeartRateSensor) {
  sensors.hrm = new HeartRateSensor();
  sensors.hrm.addEventListener("reading", () => {
    heartRateUIElement.text = sensors.hrm.heartRate.toString();
  });
  sensors.hrm.start();
}

//// Display
display.addEventListener("change", () => {
  if (display.on) {
    // Start sensors
    if (sensors.hrm) sensors.hrm.start();
  } else {
    // Stop sensors
    if (sensors.hrm) sensors.hrm.stop();
  }
});
