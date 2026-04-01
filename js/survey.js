import { SURVEY_QUESTIONS } from './config.js';

let currentQuestion = 0;
let responses = {};
let onComplete = null;

export function initSurvey(container, completionCallback) {
  currentQuestion = 0;
  responses = {};
  onComplete = completionCallback;
  renderSurveyQuestion(container);
}

function renderSurveyQuestion(container) {
  const q = SURVEY_QUESTIONS[currentQuestion];
  const total = SURVEY_QUESTIONS.length;

  container.innerHTML = `
    <div class="quiz-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${(currentQuestion / total) * 100}%"></div>
      </div>
      <span class="progress-text">Sondage ${currentQuestion + 1} / ${total}</span>
    </div>
    <div class="question-card" style="animation: slideIn 0.4s ease-out">
      <h2 class="question-text">${q.question}</h2>
      <div class="choices survey-choices">
        ${q.choices.map(choice => `
          <button class="choice-btn survey-btn" data-value="${choice.value}">
            <span class="choice-text">${choice.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.survey-btn').forEach(btn => {
    btn.addEventListener('click', () => handleSurveyAnswer(container, btn));
  });
}

function handleSurveyAnswer(container, btn) {
  const q = SURVEY_QUESTIONS[currentQuestion];

  // Visual feedback
  container.querySelectorAll('.survey-btn').forEach(b => {
    b.disabled = true;
    b.classList.add('disabled');
  });
  btn.classList.add('selected');

  responses[q.id] = btn.dataset.value;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < SURVEY_QUESTIONS.length) {
      renderSurveyQuestion(container);
    } else {
      onComplete(responses);
    }
  }, 600);
}
