import { initQuiz } from './quiz.js';
import { initSurvey } from './survey.js';
import { submitQuizResult, submitSurveyResponse } from './supabase-client.js';

let quizResultId = null;
let userScore = 0;

// Screen management
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  const target = document.getElementById(screenId);
  target.classList.add('active');
}

// Welcome → Quiz
document.getElementById('start-btn').addEventListener('click', () => {
  showScreen('screen-quiz');
  const container = document.getElementById('quiz-container');

  initQuiz(container, async (score, answers) => {
    userScore = score;
    showScoreReveal(score);

    try {
      quizResultId = await submitQuizResult(score, answers);
    } catch (e) {
      console.error('Failed to submit quiz:', e);
      // Continue anyway — survey still works, we'll link later if possible
    }
  });
});

function showScoreReveal(score) {
  showScreen('screen-score');
  const scoreNum = document.getElementById('score-number');
  const scoreMsg = document.getElementById('score-message');

  // Animated count-up
  let current = 0;
  const interval = setInterval(() => {
    current++;
    scoreNum.textContent = current;
    if (current >= score) {
      clearInterval(interval);
      scoreNum.classList.add('score-final');
    }
  }, 150);

  // Message based on score
  const messages = {
    low: [
      "L'IA n'a pas encore de souci à se faire... 😅",
      "On a tous commencé quelque part !",
      "Le chemin vers la connaissance est un marathon, pas un sprint."
    ],
    medium: [
      "Pas mal du tout ! Vous connaissez le sujet.",
      "Solide ! Vous êtes bien informé(e).",
      "Beau score ! Vous suivez l'actualité de l'IA."
    ],
    high: [
      "Impressionnant ! Vous êtes un(e) expert(e) ! 🏆",
      "Wow ! Même une IA serait impressionnée.",
      "Score remarquable ! Vous êtes inarrêtable !"
    ]
  };

  let pool;
  if (score <= 3) pool = messages.low;
  else if (score <= 7) pool = messages.medium;
  else pool = messages.high;

  scoreMsg.textContent = pool[Math.floor(Math.random() * pool.length)];
}

// Score → Survey
document.getElementById('to-survey-btn').addEventListener('click', () => {
  showScreen('screen-survey');
  const container = document.getElementById('survey-container');

  initSurvey(container, async (responses) => {
    showScreen('screen-thanks');
    launchConfetti();

    try {
      await submitSurveyResponse(quizResultId, responses);
    } catch (e) {
      console.error('Failed to submit survey:', e);
    }
  });
});

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#6C5CE7', '#00B894', '#FDCB6E', '#E17055', '#0984E3', '#E84393'];

  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
    container.appendChild(confetti);
  }
}
