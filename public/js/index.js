const $btnStart = document.getElementById("btnStart");
const $btnStop = document.getElementById("btnStop");
const $btnClean = document.getElementById("btnClean");

const $mdEdit = document.getElementById('mdEdit');
const $btnSave = document.getElementById("btnSave");
const $btnCloseMdEdit = document.getElementById('btnCloseMdEdit');

const $timerText = document.getElementById("timerText");

let config = getConfigFromStorage();

let minutes = config.minutes;
let seconds = config.seconds;

let timerIsStarted = false;
let interval = null;

$btnStart.addEventListener("click", function () {
  if (timerIsStarted) {
    return;
  }
  timerIsStarted = true;
  minutes = config.minutes;
  seconds = config.seconds;
  setTimerText();
  interval = setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else {
      if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else {
        clearInterval(interval);
      }
    }
    setTimerText();
  }, 1000);
});

$btnStop.addEventListener("click", function () {
  if (!timerIsStarted) {
    return;
  }
  clearInterval(interval);
  timerIsStarted = false;
});

$btnClean.addEventListener("click", function () {
  if (interval) {
    clearInterval(interval);
  }
  timerIsStarted = false;
  minutes = config.minutes;
  seconds = config.seconds;
  setTimerText();
});

$mdEdit.addEventListener("show.bs.modal", function () {
  const $form = document.getElementById("formEdit");
  setFormValues($form, { minutes: config.minutes, seconds: config.seconds });
});

$btnSave.addEventListener("click", function () {
  const $form = document.getElementById("formEdit");
  const formData = getFormValues($form);
  setConfigToStorage(formData);
  config = getConfigFromStorage();
  if (interval) {
    clearInterval(interval);
  }
  timerIsStarted = false;
  minutes = config.minutes;
  seconds = config.seconds;
  setTimerText();
  $btnCloseMdEdit.dispatchEvent(new Event('click'));
});

init();

function init() {
  setTimerText();
}

function setTimerText() {
  const timerText = getTimerText({ minutes, seconds });
  $timerText.innerText = timerText;
}

function getTimerText({ minutes, seconds }) {
  const minutesText = getPartText(minutes, ":");
  const secondsText = getPartText(seconds, "");
  return `${minutesText}${secondsText}`;
}

function getPartText(value, suffix) {
  return value < 10 ? `0${value}${suffix}` : `${value}${suffix}`;
}

function getFormValues(formElement) {
  return Object.values(formElement).reduce((obj, field) => {
    const type = field.type;
    switch (type) {
      case "number":
        obj[field.name] = +field.value;
        break;
      default:
        obj[field.name] = field.value;
    }
    return obj;
  }, {});
}

function setFormValues(formElement, data) {
  Object.values(formElement).forEach((field) => {
    field.value = data[field.name];
  });
}

function getConfigFromStorage() {
  const config = localStorage.getItem("config");
  return config ? JSON.parse(config) : { minutes: 10, seconds: 0 };
}

function setConfigToStorage({ minutes, seconds }) {
  const jsonString = JSON.stringify({ minutes, seconds });
  localStorage.setItem("config", jsonString);
}
