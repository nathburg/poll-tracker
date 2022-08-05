const currentPollSpotEl = document.getElementById('current-poll');
const pollForm = document.getElementById('poll-form');
const plusOptionOneButtonEl = document.querySelector('#plus-option-one-button');
const minusOptionOneButtonEl = document.querySelector('#minus-option-one-button');
const plusOptionTwoButtonEl = document.querySelector('#plus-option-two-button');
const minusOptionTwoButtonEl = document.querySelector('#minus-option-two-button');
const publishPollButtonEl = document.querySelector('#publish-poll-button');
const pastPollsEl = document.querySelector('#past-polls');

let pastPollsCounter = 0;
let currentPoll = {};
let pastPolls = [];

publishPollButtonEl.disabled = true;

pollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(pollForm);
    currentPoll = {
        question: data.get('question-input'),
        optionOne: data.get('option-one-input'),
        optionTwo: data.get('option-two-input'),
        optionOneVotes: 0,
        optionTwoVotes: 0
    };
    displayCurrentPoll(renderPoll(currentPoll));
    pollForm.reset();
    publishPollButtonEl.disabled = false;
});

plusOptionOneButtonEl.addEventListener('click', () => {
    currentPoll.optionOneVotes++;
    displayCurrentPoll();
});

minusOptionOneButtonEl.addEventListener('click', () => {
    if (currentPoll.optionOneVotes > 0) {
        currentPoll.optionOneVotes--;
        displayCurrentPoll();
    }
});

plusOptionTwoButtonEl.addEventListener('click', () => {
    currentPoll.optionTwoVotes++;
    displayCurrentPoll();
});

minusOptionTwoButtonEl.addEventListener('click', () => {
    if (currentPoll.optionTwoVotes > 0) {
        currentPoll.optionTwoVotes--;
        displayCurrentPoll();
    }
});

publishPollButtonEl.addEventListener('click', () => {
    publishPollButtonEl.disabled = true;
    pastPolls.push(currentPoll);
    currentPoll = {};
    currentPollSpotEl.textContent = '';
    pastPollsEl.textContent = '';
    displayPastPolls();
    // clearOptionCounters();
    displayCurrentPoll();
    currentPollSpotEl.textContent = '';

});

function renderPoll(poll) {

    const newPollEl = document.createElement('div');
    const questionEl = document.createElement('div');
    const optionOneEl = document.createElement('div');
    const optionOneVotesEl = document.createElement('div');
    const optionTwoEl = document.createElement('div');
    const optionTwoVotesEl = document.createElement('div');

    questionEl.textContent = `Question: ${poll.question}`;
    optionOneEl.textContent = `Option One: ${poll.optionOne}`;
    optionOneVotesEl.textContent = `Option One has ${poll.optionOneVotes} votes.`;
    optionTwoEl.textContent = `Option Two: ${poll.optionTwo}`;
    optionTwoVotesEl.textContent = `Option Two has ${poll.optionTwoVotes} votes.`;
    
    

    newPollEl.append(questionEl, optionOneEl, optionOneVotesEl, optionTwoEl, optionTwoVotesEl);

    return newPollEl;
}

function displayCurrentPoll() {
    currentPollSpotEl.textContent = '';
    currentPollSpotEl.append(renderPoll(currentPoll));
}

function displayPastPolls() {

    for (let poll of pastPolls) {
        pastPollsCounter++;
        const pollCountEl = document.createElement('h3');
        pollCountEl.textContent = `Poll #${pastPollsCounter}`;
        pastPollsEl.append(pollCountEl);
        pastPollsEl.append(renderPoll(poll));
    }

    pastPollsCounter = 0;
}