import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const { createClient } = supabase;
let client = null;

function getClient() {
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return client;
}

// Submit quiz result, returns the inserted row's id
export async function submitQuizResult(score, answers) {
  const { data, error } = await getClient()
    .from('quiz_results')
    .insert({ score, answers })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

// Submit survey response linked to a quiz result
export async function submitSurveyResponse(quizResultId, responses) {
  const { error } = await getClient()
    .from('survey_responses')
    .insert({ quiz_result_id: quizResultId, responses });

  if (error) throw error;
}

// Fetch all stats for dashboard
export async function fetchStats() {
  const sb = getClient();

  const [quizRes, surveyRes] = await Promise.all([
    sb.from('quiz_results').select('score, created_at'),
    sb.from('survey_responses').select('responses')
  ]);

  if (quizRes.error) throw quizRes.error;
  if (surveyRes.error) throw surveyRes.error;

  return {
    quizResults: quizRes.data,
    surveyResponses: surveyRes.data.map(r => r.responses)
  };
}

// Subscribe to realtime changes for dashboard
export function subscribeToChanges(onQuizInsert, onSurveyInsert) {
  const sb = getClient();

  const channel = sb.channel('dashboard-realtime')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'quiz_results' }, payload => {
      onQuizInsert(payload.new);
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'survey_responses' }, payload => {
      onSurveyInsert(payload.new);
    })
    .subscribe();

  return channel;
}
