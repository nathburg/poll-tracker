const currentPollSpotEl = document.getElementById('current-poll');
const pollForm = document.getElementById('poll-form');
const optionOneButtonEl = document.querySelector('#option-one-button');
const optionTwoButtonEl = document.querySelector('#option-two-button');
const optionOneCounterEl = document.querySelector('#option-one-counter');
const optionTwoCounterEl = document.querySelector('#option-two-counter');
const publishPollButtonEl = document.querySelector('#publish-poll-button');
const pastPollsEl = document.querySelector('#past-polls');

let optionOneCounter = 0;
let optionTwoCounter = 0;
let pastPollsCounter = 0;
let currentPoll = {};
let pastPolls = [];

pollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentPoll = new FormData(pollForm);
    displayCurrentPoll(renderPoll(currentPoll));
    pollForm.reset();
});

optionOneButtonEl.addEventListener('click', () => {
    optionOneCounterEl.textContent = '';
    optionOneCounter++;
    displayCurrentPoll();
});

optionTwoButtonEl.addEventListener('click', () => {
    optionTwoCounterEl.textContent = '';
    optionTwoCounter++;
    displayCurrentPoll();
});

publishPollButtonEl.addEventListener('click', () => {
    pastPolls.push(currentPoll);
    currentPollSpotEl.textContent = '';
    pastPollsEl.textContent = '';
    displayPastPolls();
    optionOneCounter = 0;
    optionTwoCounter = 0;
    displayCurrentPoll();
    currentPollSpotEl.textContent = '';
});

function renderPoll(poll) {

    const newPoll = document.createElement('div');
    const questionEl = document.createElement('p');
    const optionOneEl = document.createElement('p');
    const optionOneVotesEl = document.createElement('p');
    const optionTwoEl = document.createElement('p');
    const optionTwoVotesEl = document.createElement('p');

    questionEl.textContent = `Question: ${poll.get('question-input')}`;
    optionOneEl.textContent = `Option 1: ${poll.get('option-one-input')}`;
    optionOneVotesEl.textContent = `Option 1 has ${optionOneCounter} votes.`;
    optionTwoEl.textContent = `Option 2: ${poll.get('option-two-input')}`;
    optionTwoVotesEl.textContent = `Option 2 has ${optionTwoCounter} votes.`;
    
    newPoll.append(questionEl, optionOneEl, optionOneVotesEl, optionTwoEl, optionTwoVotesEl);

    return newPoll;
}

function displayCurrentPoll() {
    currentPollSpotEl.textContent = '';
    currentPollSpotEl.append(renderPoll(currentPoll));
    optionOneCounterEl.textContent = optionOneCounter;
    optionTwoCounterEl.textContent = optionTwoCounter;
}

function displayPastPolls() {

    for (let poll of pastPolls) {
        pastPollsCounter++;
        const pollCountEl = document.createElement('h3');
        pollCountEl.textContent =`Poll #${pastPollsCounter}`;
        pastPollsEl.append(pollCountEl);
        pastPollsEl.append(renderPoll(poll));
    }

    pastPollsCounter = 0;
}