function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

refs.btnStart.addEventListener("click", StartColorChange);
refs.btnStop.addEventListener("click", StopColorChange);

let intervalId = null;

function StartColorChange() {
    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000)

    refs.btnStart.setAttribute('disabled', true)
    refs.btnStop.removeAttribute('disabled')
}

function StopColorChange() {
    clearInterval(intervalId);

    refs.btnStop.setAttribute('disabled', true)
    refs.btnStart.removeAttribute('disabled')
}
