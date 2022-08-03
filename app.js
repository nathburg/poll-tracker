const currentPollSpotEl = document.getElementById('current-poll');
const pollForm = document.getElementById('poll-form');
const plusOptionOneButtonEl = document.querySelector('#plus-option-one-button');
const minusOptionOneButtonEl = document.querySelector('#minus-option-one-button');
const plusOptionTwoButtonEl = document.querySelector('#plus-option-two-button');
const minusOptionTwoButtonEl = document.querySelector('#minus-option-two-button');
const publishPollButtonEl = document.querySelector('#publish-poll-button');
const pastPollsEl = document.querySelector('#past-polls');

let optionOneCounter = 0;
let optionTwoCounter = 0;
let pastPollsCounter = 0;
let currentPoll = {};
let pastPolls = [];
let pastPollsStats = [];

pollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearOptionCounters();
    currentPoll = new FormData(pollForm);
    displayCurrentPoll(renderPoll(currentPoll));
    pollForm.reset();

});

plusOptionOneButtonEl.addEventListener('click', () => {
    // optionOneCounterEl.textContent = '';
    optionOneCounter++;
    displayCurrentPoll();
});

minusOptionOneButtonEl.addEventListener('click', () => {
    if (optionOneCounter > 0) {
        // optionOneCounterEl.textContent = '';
        optionOneCounter--;
        displayCurrentPoll();
    }
});

plusOptionTwoButtonEl.addEventListener('click', () => {
    // optionTwoCounterEl.textContent = '';
    optionTwoCounter++;
    displayCurrentPoll();
});

minusOptionTwoButtonEl.addEventListener('click', () => {
    if (optionTwoCounter > 0) {
        // optionTwoCounterEl.textContent = '';
        optionTwoCounter--;
        displayCurrentPoll();
    }
});

publishPollButtonEl.addEventListener('click', () => {
    pastPolls.push(currentPoll);
    pastPollsStats.push([optionOneCounter, optionTwoCounter]);
    currentPoll = {};
    currentPollSpotEl.textContent = '';
    pastPollsEl.textContent = '';
    displayPastPolls();
    // clearOptionCounters();
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
    optionOneEl.textContent = `Option One: ${poll.get('option-one-input')}`;
    optionOneVotesEl.textContent = `Option One has ${optionOneCounter} votes.`;
    optionTwoEl.textContent = `Option Two: ${poll.get('option-two-input')}`;
    optionTwoVotesEl.textContent = `Option Two has ${optionTwoCounter} votes.`;
    
    newPoll.append(questionEl, optionOneEl, optionOneVotesEl, optionTwoEl, optionTwoVotesEl);

    return newPoll;
}

function displayCurrentPoll() {
    currentPollSpotEl.textContent = '';
    currentPollSpotEl.append(renderPoll(currentPoll));
    // optionOneCounterEl.textContent = optionOneCounter;
    // optionTwoCounterEl.textContent = optionTwoCounter;
}

function displayPastPolls() {

    for (let poll of pastPolls) {
        optionOneCounter = pastPollsStats[pastPollsCounter][0];
        optionTwoCounter = pastPollsStats[pastPollsCounter][1];
        pastPollsCounter++;
        const pollCountEl = document.createElement('h3');
        pollCountEl.textContent = `Poll #${pastPollsCounter}`;
        pastPollsEl.append(pollCountEl);
        pastPollsEl.append(renderPoll(poll));
    }

    pastPollsCounter = 0;
}

function clearOptionCounters() {
    optionOneCounter = 0;
    optionTwoCounter = 0;
}