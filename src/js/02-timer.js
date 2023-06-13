import flatpickr from 'flatpickr';

document.addEventListener('DOMContentLoaded', function () {
  const dateTimePicker = document.getElementById('datetime-picker');
  const startButton = document.querySelector('[data-start]');
  const daysValue = document.querySelector('[data-days]');
  const hoursValue = document.querySelector('[data-hours]');
  const minutesValue = document.querySelector('[data-minutes]');
  const secondsValue = document.querySelector('[data-seconds]');

  let countdownInterval;

  flatpickr(dateTimePicker, {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    minDate: 'today',
    onChange: function (selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        startButton.removeAttribute('disabled');
      } else {
        startButton.setAttribute('disabled', 'disabled');
      }
    },
  });

  startButton.addEventListener('click', function () {
    const selectedDate = new Date(dateTimePicker.value).getTime();
    const currentDate = new Date().getTime();
    const timeDifference = selectedDate - currentDate;

    if (timeDifference > 0) {
      startButton.setAttribute('disabled', 'disabled');

      countdownInterval = setInterval(function () {
        const currentTime = new Date().getTime();
        const remainingTime = selectedDate - currentTime;

        if (remainingTime > 0) {
          const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

          daysValue.textContent = formatTimeValue(days);
          hoursValue.textContent = formatTimeValue(hours);
          minutesValue.textContent = formatTimeValue(minutes);
          secondsValue.textContent = formatTimeValue(seconds);
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
  });

  function formatTimeValue(value) {
    return value < 10 ? `0${value}` : value;
  }
});
