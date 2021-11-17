import Notiflix from 'notiflix';

const form = document.querySelector(".form");
form.addEventListener("submit", onFormData);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
      return new Promise((resolve, reject) => {
      setTimeout(() => { 
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        }
      }, delay)
  })
  }

function onFormData(evt) {
  evt.preventDefault()

  let {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  let enteredDelay = Number(delay.value);
  let enteredStep = Number(step.value);
  let enteredAmount = Number(amount.value);

  for (let position = 1; position <= enteredAmount; position += 1) {
    createPromise(position, enteredDelay)

      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })

      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
    enteredDelay += enteredStep;
  }
}