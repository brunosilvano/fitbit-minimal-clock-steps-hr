// Fitbit standard modules
import { me as appbit } from "appbit";
import clock from "clock";
import { display } from "display";
import document from "document";
import { preferences } from "user-settings";

// Modules that require permission
import { today } from "user-activity";
import { user } from "user-profile";

// Sensor modules
import { HeartRateSensor } from "heart-rate";     // requires permission

// Custom modules
import { formatHours, zeroPad } from "../common/utils";

// Interface for holding multiple sensors references
interface ISensors {
  hrm?: HeartRateSensor,
}

// Globals
const sensors: ISensors = {};   // holds used sensors references - TODO: improve references to sensors: maybe an array is easier to iterate through?
let timerId = 0;

// Get references to UI elements
const viewportElement = document.getElementById("viewport");
const dateUIElement = document.getElementById("dateText");
const clockUIElement = document.getElementById("clockText");
const heartRateUIElement = document.getElementById("heartRateText");
const stepsUIElement = document.getElementById("stepsText");

//// Helper
function refreshStats() {
  // Steps
  if (appbit.permissions.granted("access_activity")) {
    const steps = today.adjusted.steps;
    if (steps !== undefined) {
      stepsUIElement.text = steps.toString();
    }
  }
}

function startTimer() {
  stopTimer();
  if (timerId === 0) {
    timerId = setInterval(refreshStats, 1500);   // refresh stats every 1500 ms
  }
}

function stopTimer() {
  if (timerId !== 0) {
    clearInterval(timerId);
    timerId = 0;
  }
}

//// Clock
// Clock settings
clock.granularity = "minutes";

clock.ontick = ev => {
  // Get clock values
  const today = ev.date;
  const hours = today.getHours();
  const minutes = today.getMinutes();

  // Get date values
  const monthDay = today.getDate();
  const weekDay = today.toString().split(" ")[0];   // FIXME: add localization: https://dev.fitbit.com/build/guides/localization/

  // Formatted strings
  const formattedTime = `${formatHours(hours, preferences.clockDisplay)}:${zeroPad(minutes)}`;
  const formattedDate = `${weekDay} ${monthDay}`;

  // Update value of text
  clockUIElement.text = formattedTime;
  dateUIElement.text = formattedDate;
};

//// Heart-rate
if (HeartRateSensor) {
  sensors.hrm = new HeartRateSensor();
  sensors.hrm.addEventListener("reading", () => {
    // Update heart-rate display
    const hr = sensors.hrm.heartRate;
    heartRateUIElement.text = hr.toString();

    // Change background color based on heart-rate zone
    const heartRateZone = user.heartRateZone(hr);
    if ((heartRateZone === "out-of-range" || heartRateZone === "below-custom") && viewportElement.class !== "") viewportElement.class = "";
    else if (heartRateZone === "fat-burn" && viewportElement.class !== "yellow") viewportElement.class = "yellow";   // TODO: improve toggling of classes - make it more generic instead of always setting it to an empty string
    else if ((heartRateZone === "cardio" || heartRateZone === "custom") && viewportElement.class !== "orange") viewportElement.class = "orange";
    else if ((heartRateZone === "peak" || heartRateZone === "above-custom") && viewportElement.class !== "red") viewportElement.class = "red";
  });
  sensors.hrm.start();
}

//// Display
display.addEventListener("change", () => {
  if (display.on) {
    // Start sensors
    if (sensors.hrm) sensors.hrm.start();
    startTimer();
  } else {
    // Stop sensors
    if (sensors.hrm) sensors.hrm.stop();
    stopTimer();
  }
});

refreshStats(); // update stats on init to avoid showing empty fields
startTimer();   // start refreshing the stats
