import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startEl = document.querySelector('[data-start]');
const myInput = document.querySelector('#datetime-picker');

startEl.disabled = true;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startEl.disabled = true;
    } else {
      startEl.disabled = false;
    }
  },
};

flatpickr(myInput, options);

startEl.addEventListener('click', () => {
  if (!selectedDate || selectedDate < new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a valid date in the future',
    });
    return;
  }

  startEl.disabled = true;
  myInput.disabled = true;

  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const ms = selectedDate - currentDate;

    if (ms <= 0) {
      clearInterval(intervalId);
      return;
    }
    renderTime(ms);
  }, 1000);
});

function renderTime(ms) {
  const parsedTime = convertMs(ms);
  updateTimer(parsedTime);
}

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

function updateTimer({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = days
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-hours]').textContent = hours
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = minutes
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = seconds
    .toString()
    .padStart(2, '0');
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
