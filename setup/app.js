const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// select items
const deadline = document.querySelector(".deadline");
const giveaway = document.querySelector(".giveaway");
const times = document.querySelectorAll(".deadline-format h4");

// get temporary time
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2021,6,2,13,51,0);

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11,30,0)
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
let month = futureDate.getMonth();
month = months[month];
let day = futureDate.getDay();
day = weekdays[day];
const date = futureDate.getDate();

giveaway.textContent = `Giveaway ends on ${day}, ${month} ${date} ${year} ${hours}:${minutes}`;

// future time in miliseconds
const futureTime = futureDate.getTime();

// calculate remaining time
function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  
  // values in Miliseconds
  // 1s = 1000 ms
  // 1m = 60 * 1000ms
  // 1h = 60 * 60 * 1000ms
  // 1d = 24 * 60 * 60 * 1000ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  
  // calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);
  console.log(seconds);

  // set value array
  const value = [days, hours, minutes, seconds];

  function format(time){
    if (time < 10) {
    return time = `0${time}`;
    }else {
      return time;
    }
  }

  times.forEach(function (time,index) {
    time.innerHTML = format(value[index]);
  });
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired.</h4>`;
  }
  console.log(t);
}

// countdown
let countdown = setInterval(getRemainingTime,1000);
getRemainingTime();