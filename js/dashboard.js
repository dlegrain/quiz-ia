import { SNARKY_COMMENTS, SURVEY_QUESTIONS } from './config.js';
import { fetchStats, subscribeToChanges } from './supabase-client.js';

// State
let quizResults = [];
let surveyResponses = [];
let currentCommentIndex = 0;
let commentPool = [];

// Label maps for survey display
const LABEL_MAPS = {
  models_count: { '0': 'Aucun', '1': 'Un seul', '2-3': '2 à 3', '4-5': '4 à 5', '6+': '6 ou plus' },
  paid: { 'yes_personal': 'Oui, perso', 'yes_employer': 'Employeur paie', 'no': 'Gratuit seul.', 'didnt_know': 'Ne savait pas' },
  frequency: { 'multiple_daily': 'Plrs fois/jour', 'daily': '1 fois/jour', 'weekly': 'Plrs fois/sem.', 'monthly': 'Plrs fois/mois', 'rarely': 'Rarement' },
  satisfaction: { '5': 'Très satisfait', '4': 'Plutôt satisfait', '3': 'Neutre', '2': 'Plutôt insatisfait', '1': 'Très insatisfait' },
  main_use: { 'writing': 'Rédaction', 'code': 'Code', 'research': 'Recherche', 'creative': 'Création', 'productivity': 'Productivité', 'other': 'Autre' },
  trust: { 'always': 'Toujours', 'often': 'Souvent', 'sometimes': 'Parfois', 'rarely': 'Rarement', 'never': 'Jamais' }
};

const CHART_TARGETS = {
  models_count: 'chart-models',
  paid: 'chart-paid',
  frequency: 'chart-frequency',
  satisfaction: 'chart-satisfaction',
  main_use: 'chart-use',
  trust: 'chart-trust'
};

// Color assignments per bar index
const BAR_COLORS = ['color-0', 'color-1', 'color-2', 'color-3', 'color-4', 'color-5'];

// Initialize
async function init() {
  try {
    const stats = await fetchStats();
    quizResults = stats.quizResults;
    surveyResponses = stats.surveyResponses;
    render();
  } catch (e) {
    console.error('Failed to fetch stats:', e);
  }

  // Realtime — debounced
  let debounceTimer = null;

  subscribeToChanges(
    (quizRow) => {
      quizResults.push(quizRow);
      debounceRender();
    },
    (surveyRow) => {
      surveyResponses.push(surveyRow.responses);
      debounceRender();
    }
  );

  function debounceRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(render, 500);
  }

  // Rotate snarky comments every 8 seconds
  setInterval(rotateComment, 8000);
}

function render() {
  renderParticipantCount();
  renderAverageScore();
  renderScoreDistribution();
  renderAllSurveyCharts();
  buildCommentPool();
  rotateComment();
}

// --- Participant count ---
function renderParticipantCount() {
  const el = document.getElementById('participant-count');
  animateNumber(el, quizResults.length);
}

// --- Average score ---
function renderAverageScore() {
  const el = document.getElementById('avg-score');
  if (quizResults.length === 0) {
    el.textContent = '—';
    return;
  }
  const avg = quizResults.reduce((sum, r) => sum + r.score, 0) / quizResults.length;
  animateDecimal(el, avg);
}

// --- Score distribution ---
function renderScoreDistribution() {
  const container = document.getElementById('score-distribution');
  const counts = new Array(11).fill(0);
  quizResults.forEach(r => counts[r.score]++);
  const max = Math.max(...counts, 1);

  container.innerHTML = '';
  for (let i = 0; i <= 10; i++) {
    const pct = (counts[i] / max) * 100;
    const wrapper = document.createElement('div');
    wrapper.className = 'score-bar-wrapper';
    wrapper.innerHTML = `
      <div class="score-bar" style="height: ${Math.max(pct, 4)}%"></div>
      <span class="score-bar-label">${i}</span>
    `;
    container.appendChild(wrapper);
  }
}

// --- Survey charts ---
function renderAllSurveyCharts() {
  for (const question of SURVEY_QUESTIONS) {
    renderSurveyChart(question.id);
  }
}

function renderSurveyChart(questionId) {
  const containerId = CHART_TARGETS[questionId];
  if (!containerId) return;
  const container = document.getElementById(containerId);
  if (!container) return;

  const labels = LABEL_MAPS[questionId];
  const counts = {};
  // Initialize all possible values
  for (const key of Object.keys(labels)) {
    counts[key] = 0;
  }

  surveyResponses.forEach(r => {
    const val = r[questionId];
    if (val !== undefined) {
      counts[val] = (counts[val] || 0) + 1;
    }
  });

  const total = surveyResponses.length || 1;
  const entries = Object.entries(counts);

  container.innerHTML = '';
  entries.forEach(([key, count], i) => {
    const pct = (count / total) * 100;
    const row = document.createElement('div');
    row.className = 'bar-row';
    row.innerHTML = `
      <span class="bar-label" title="${labels[key] || key}">${labels[key] || key}</span>
      <div class="bar-track">
        <div class="bar-fill ${BAR_COLORS[i % BAR_COLORS.length]}" style="width: ${pct}%"></div>
      </div>
      <span class="bar-value">${Math.round(pct)}%</span>
    `;
    container.appendChild(row);
  });
}

// --- Snarky comments ---
function buildCommentPool() {
  commentPool = [];
  if (quizResults.length === 0) return;

  const avg = quizResults.reduce((sum, r) => sum + r.score, 0) / quizResults.length;

  // Score comments
  if (avg < 4) commentPool.push(...SNARKY_COMMENTS.score.low);
  else if (avg <= 7) commentPool.push(...SNARKY_COMMENTS.score.medium);
  else commentPool.push(...SNARKY_COMMENTS.score.high);

  if (surveyResponses.length === 0) return;

  // Paid comments
  const paidCounts = { free: 0, paid: 0 };
  surveyResponses.forEach(r => {
    if (r.paid === 'no' || r.paid === 'didnt_know') paidCounts.free++;
    else paidCounts.paid++;
  });
  const paidRatio = paidCounts.paid / surveyResponses.length;
  if (paidRatio < 0.3) commentPool.push(SNARKY_COMMENTS.paid.mostly_free);
  else if (paidRatio > 0.6) commentPool.push(SNARKY_COMMENTS.paid.mostly_paid);
  else commentPool.push(SNARKY_COMMENTS.paid.mixed);

  // Frequency comments
  const freqCounts = { heavy: 0, moderate: 0, light: 0 };
  surveyResponses.forEach(r => {
    if (r.frequency === 'multiple_daily' || r.frequency === 'daily') freqCounts.heavy++;
    else if (r.frequency === 'weekly') freqCounts.moderate++;
    else freqCounts.light++;
  });
  const dominantFreq = Object.entries(freqCounts).sort((a, b) => b[1] - a[1])[0][0];
  commentPool.push(SNARKY_COMMENTS.frequency[dominantFreq]);

  // Trust comments
  const trustCounts = { trusting: 0, skeptical: 0 };
  surveyResponses.forEach(r => {
    if (r.trust === 'always' || r.trust === 'often') trustCounts.trusting++;
    else trustCounts.skeptical++;
  });
  if (trustCounts.trusting > trustCounts.skeptical) commentPool.push(SNARKY_COMMENTS.trust.trusting);
  else if (trustCounts.skeptical > trustCounts.trusting) commentPool.push(SNARKY_COMMENTS.trust.skeptical);
  else commentPool.push(SNARKY_COMMENTS.trust.mixed);

  // Satisfaction comments
  const satValues = surveyResponses.map(r => parseInt(r.satisfaction)).filter(v => !isNaN(v));
  if (satValues.length > 0) {
    const satAvg = satValues.reduce((a, b) => a + b, 0) / satValues.length;
    if (satAvg >= 4) commentPool.push(SNARKY_COMMENTS.satisfaction.happy);
    else if (satAvg >= 2.5) commentPool.push(SNARKY_COMMENTS.satisfaction.meh);
    else commentPool.push(SNARKY_COMMENTS.satisfaction.unhappy);
  }
}

function rotateComment() {
  const el = document.getElementById('ticker-text');
  if (commentPool.length === 0) {
    el.textContent = 'En attente des premiers résultats…';
    return;
  }
  currentCommentIndex = (currentCommentIndex + 1) % commentPool.length;
  el.style.animation = 'none';
  // Force reflow
  el.offsetHeight;
  el.style.animation = 'tickerFadeIn 0.8s ease';
  el.textContent = commentPool[currentCommentIndex];
}

// --- Utilities ---
function animateNumber(el, target) {
  const current = parseInt(el.textContent) || 0;
  if (current === target) return;

  const duration = 600;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(current + (target - current) * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function animateDecimal(el, target) {
  const text = el.textContent;
  const current = text === '—' ? 0 : parseFloat(text) || 0;

  const duration = 800;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = current + (target - current) * eased;
    el.textContent = value.toFixed(1);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Start
init();
