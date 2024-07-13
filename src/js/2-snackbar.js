import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', e => {
  e.preventDefault();

  const delay = parseInt(e.target.elements.delay.value.trim(), 10);
  const state = e.target.elements.state.value;

  const makePromise = ({ delay, shouldResolve }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve();
        } else {
          reject();
        }
      }, delay);
    });
  };

  const shouldResolve = state === 'fulfilled';

  makePromise({ delay, shouldResolve })
    .then(() => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
