import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { formatHours, zeroPad } from "../common/utils";

// Get references to UI elements
const clockUIElement = document.getElementById("clockText");

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

