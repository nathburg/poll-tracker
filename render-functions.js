export function renderPoll(poll) {
    const newPoll = document.createElement('div');
    const questionEl = document.createElement('p');
    const optionOneEl = document.createElement('p');
    const optionTwoEl = document.createElement('p');

    questionEl.textContent =`Question: ${poll.get('question-input')}`;
    optionOneEl.textContent =`Option 1: ${poll.get('option-one-input')}`;
    optionTwoEl.textContent = `Option 2: ${poll.get('option-two-input')}`;
    
    newPoll.append(questionEl, optionOneEl, optionTwoEl);

    return newPoll;
}