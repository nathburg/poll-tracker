import { renderPoll } from "./render-functions.js";

const currentPollSpotEl = document.getElementById('current-poll');
const pollForm = document.getElementById('poll-form');
const startPollButtonEl = document.getElementById('start-poll-button');
const optionOneButtonEl = document.querySelector('#option-one-button');
const optionTwoButtonEl = document.querySelector('#option-two-button');
const optionOneCounterEl = document.querySelector('#option-one-counter');
const optionTwoCounterEl = document.querySelector('#option-two-counter');

let optionOneCounter = 0;
let optionTwoCounter = 0;

pollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(pollForm);
    currentPollSpotEl.append(renderPoll(data));




 
});

optionOneButtonEl.addEventListener('click', () => {
    optionOneCounterEl.textContent = '';
    optionOneCounter++;
    optionOneCounterEl.textContent = optionOneCounter;
})

optionTwoButtonEl.addEventListener('click', () => {
    optionTwoCounterEl.textContent = '';
    optionTwoCounter++;
    optionTwoCounterEl.textContent = optionTwoCounter;
})