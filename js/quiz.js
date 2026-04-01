import { QUIZ_QUESTIONS } from './config.js';

let currentQuestion = 0;
let score = 0;
let answers = [];
let onComplete = null;

export function initQuiz(container, completionCallback) {
  currentQuestion = 0;
  score = 0;
  answers = [];
  onComplete = completionCallback;
  renderQuestion(container);
}

function renderQuestion(container) {
  const q = QUIZ_QUESTIONS[currentQuestion];
  const total = QUIZ_QUESTIONS.length;

  container.innerHTML = `
    <div class="quiz-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${(currentQuestion / total) * 100}%"></div>
      </div>
      <span class="progress-text">${currentQuestion + 1} / ${total}</span>
    </div>
    <div class="question-card" style="animation: slideIn 0.4s ease-out">
      <h2 class="question-text">${q.question}</h2>
      <div class="choices">
        ${q.choices.map((choice, i) => `
          <button class="choice-btn" data-index="${i}">
            <span class="choice-letter">${['A', 'B', 'C', 'D'][i]}</span>
            <span class="choice-text">${choice}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Attach click handlers
  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(container, btn, parseInt(btn.dataset.index)));
  });
}

function handleAnswer(container, btn, chosenIndex) {
  const q = QUIZ_QUESTIONS[currentQuestion];
  const isCorrect = chosenIndex === q.correct;

  // Disable all buttons
  container.querySelectorAll('.choice-btn').forEach(b => {
    b.disabled = true;
    b.classList.add('disabled');
  });

  // Show correct/incorrect
  btn.classList.add(isCorrect ? 'correct' : 'incorrect');
  // Always highlight the correct answer
  container.querySelectorAll('.choice-btn')[q.correct].classList.add('correct');

  if (isCorrect) score++;
  answers.push(chosenIndex);

  // Auto-advance
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < QUIZ_QUESTIONS.length) {
      renderQuestion(container);
    } else {
      onComplete(score, answers);
    }
  }, 3200);
}

export function getScore() { return score; }
export function getAnswers() { return answers; }
