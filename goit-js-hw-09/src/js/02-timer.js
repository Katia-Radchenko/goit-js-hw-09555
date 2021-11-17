import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector("button[data-start]"),
    input: document.querySelector("#datetime-picker"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
    notification: document.querySelector(".notification"),
};

let selectedTime = null;
let currentTime = null;
let timerId = null;
refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener("click", startTimer)

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        checkDates(selectedDates);
    },
};
flatpickr("#datetime-picker", options);

function checkDates(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    currentTime = Date.now();
    if (selectedTime < currentTime) {
       Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;}
}

function startTimer() {
    refs.input.setAttribute('disabled', true);
    refs.startBtn.setAttribute('disabled', true);
    
    timerId = setInterval(() => {
        currentTime = Date.now();
        const deltaTime = selectedTime - currentTime;
        if (selectedTime <= currentTime) {
          clearInterval(timerId);
          Notiflix.Notify.failure('BANG');
          return;
        } 
        const time = convertMs(deltaTime);
        updateTime(time)
    }, 1000)
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

// добавляет '0'  *********************************
function addLeadingZero(value) {
return String(value).padStart(2, "0");
}

// подсчет значений *********************************
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}


