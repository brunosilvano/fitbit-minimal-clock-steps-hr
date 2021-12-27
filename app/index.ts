import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { formatHours, zeroPad } from '../common/utils';

const myLabel = document.getElementById('myLabel');

// Clock settings
clock.granularity = "seconds";

clock.ontick = ev => {
  // Get clock values
  let today = ev.date;
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  // Format display time
  let formattedTime = `${formatHours(hours, preferences.clockDisplay)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;

  // Update value of text
  myLabel.text = formattedTime;
}

