import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDate]) {
    if (selectedDate < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 3000, //
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

let updateTimer;

function updateTimerValues(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function startCountdown() {
  const selectedDate = new Date(datetimePicker.value).getTime();
  btnStart.disabled = true;
  datetimePicker.disabled = true;

  updateTimer = setInterval(() => {
    const currentDate = new Date().getTime();
    const difference = selectedDate - currentDate;

    if (difference <= 0) {
      clearInterval(updateTimer);
      updateTimerValues(0, 0, 0, 0);
      btnStart.disabled = true;
      datetimePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);
    updateTimerValues(days, hours, minutes, seconds);
  }, 1000);
}

btnStart.addEventListener('click', startCountdown);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
