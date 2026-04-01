-- Run this in Supabase SQL Editor to create the tables

-- Table 1: Quiz results
CREATE TABLE quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10),
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table 2: Survey responses
CREATE TABLE survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_result_id UUID REFERENCES quiz_results(id),
  responses JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable realtime for dashboard
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_results;
ALTER PUBLICATION supabase_realtime ADD TABLE survey_responses;

-- RLS: allow anonymous inserts and reads (public conference, no auth needed)
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert quiz" ON quiz_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read quiz" ON quiz_results FOR SELECT USING (true);
CREATE POLICY "Anyone can insert survey" ON survey_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read survey" ON survey_responses FOR SELECT USING (true);
