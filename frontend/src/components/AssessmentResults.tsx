import { useEffect, useState } from 'react';
import axios from 'axios';
import './AssessmentResults.css';
import ResultsBarChart from './ResultsBarChart';
import ScoreRadialChart from './ScoreRadialChart';

interface AssessmentResults {
  instance: {
    id: string;
    completed: boolean;
    completed_at: string | null;
    element: string;
  };
  total_questions: number;
  answered_questions: number;
  completion_percentage: number;
  scores: {
    total_score: number;
    max_score: number;
    percentage: number;
  };
  element_scores: Record<string, any>;
  insights: Array<{
    type: string;
    message: string;
    positive: boolean;
  }>;
}

interface Props {
  instanceId: string;
}

export default function AssessmentResults({ instanceId }: Props) {
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [questionsOpen, setQuestionsOpen] = useState(false);

  useEffect(() => {
    if (!instanceId) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8002'}/api/assessment/results/${instanceId}`
        );
        setResults(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load assessment results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [instanceId]);

  if (loading) {
    return (
      <div className="loading-bar-container">
        <div className="loading-bar">
          <div className="loading-progress" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!results) {
    return <div className="empty">No results to display</div>;
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return '#27ae60';
    if (percentage >= 60) return '#f39c12';
    return '#e74c3c';
  };

  const elementKey = Object.keys(results.element_scores ?? {})[0];

  const questionChartData =
    elementKey && results.element_scores[elementKey]?.question_answers
      ? results.element_scores[elementKey].question_answers
          .filter((q: any) => !q.is_reflection)
          .map((q: any) => ({
            name: `Q${q.question_sequence}`,
            value:
              q.is_answered && typeof q.answer_value === 'number'
                ? q.answer_value
                : 0,
          }))
      : [];

  return (
    <div className="assessment-results">
      <div className="results-header">
        <h1>Assessment Results - Element {results.instance.element}</h1>
      </div>

      <div className="top-cards-row">

      <div className="card score-card">
          <h3>Overall Score</h3>

          <div className="score-display">
            <ScoreRadialChart percentage={results.scores.percentage} />

            <div
              className="score-percentage"
              style={{
                color: getScoreColor(results.scores.percentage),
              }}
            >
              {results.scores.percentage}%
            </div>

            <div className="score-details">
              <p>
                {results.scores.total_score} / {results.scores.max_score} points
                <span className="info-tooltip">
                  ⓘ
                  <span className="tooltip-text">
                    Normalized from 1–5 scale
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="card progress-card">
        {results.insights.length > 0 && (
          <div className="insights-card">
            <h3>Insight and Progression</h3>
            <div className="insights">
              {results.insights.map((insight, index) => (
                <div
                  key={index}
                  className={`insight ${
                    insight.positive ? 'positive' : 'negative'
                  }`}
                >
                  <span className="insight-type">{insight.type}</span>
                  <p className="insight-message">{insight.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

          <h3>Progress</h3>

          <div className="progress-circle">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="12"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#27ae60"
                strokeWidth="12"
                strokeDasharray={`${
                  (results.completion_percentage / 100) * 339.292
                } 339.292`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>

            <div className="progress-text">
              <span className="progress-percentage">
                {results.completion_percentage}%
              </span>
              <span className="progress-label">Complete</span>
            </div>
          </div>

          <div className="progress-details">
            <p>
              {results.answered_questions} of {results.total_questions} questions
              answered
            </p>
          </div>
          
        </div>
      </div>

     {/* Bar Chart Overview */}
      {Object.keys(results.element_scores).length > 0 && (
        <div className="card element-scores-card">
          <h3>Performance Overview</h3>

          {questionChartData.length > 0 && (
            <ResultsBarChart
              data={questionChartData}
              barColor="#3498db"
            />
          )}

          <div className="element-scores">
            {Object.values(results.element_scores).map(
              (elementScore: any) => (
                <div
                  key={elementScore.element}
                  className="element-score"
                >
                  <div className="element-header">
                    <span className="element-name">
                      Element {elementScore.element}
                    </span>
                    <span
                      className="element-percentage"
                      style={{
                        color: getScoreColor(
                          elementScore.scores.percentage
                        ),
                      }}
                    >
                      {elementScore.scores.percentage}%
                    </span>
                  </div>

                  <div className="element-progress-bar">
                    <div
                      className="element-progress-fill"
                      style={{
                        width: `${elementScore.completion_percentage}%`,
                        backgroundColor: getScoreColor(
                          elementScore.scores.percentage
                        ),
                      }}
                    />
                  </div>

                  <div className="element-details">
                    <span>
                      {elementScore.answered_questions} /{' '}
                      {elementScore.total_questions} answered
                    </span>
                    <span>
                      {elementScore.scores.total_score} /{' '}
                      {elementScore.scores.max_score} points
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

{/* Questions and Answers Accordion */}
{results.element_scores && (
  <div className="card questions-card">
    <div
      className="accordion-header"
      onClick={() => setQuestionsOpen(!questionsOpen)}
    >
      <h3>Questions and Answers</h3>
      <span className={`accordion-icon ${questionsOpen ? 'open' : ''}`}>
        ▼
      </span>
    </div>

    {questionsOpen && (
      <div className="accordion-content">
        <div className="filter-buttons">
          <button
            className={filter === 'All' ? 'active' : ''}
            onClick={() => setFilter('All')}
          >
            All (
            {Object.values(results.element_scores).reduce(
              (total: number, elementScore: any) =>
                total + elementScore.question_answers.length,
              0
            )}
            )
          </button>

          <button
            className={filter === 'Answered' ? 'active' : ''}
            onClick={() => setFilter('Answered')}
          >
            Answered (
            {Object.values(results.element_scores).reduce(
              (total: number, elementScore: any) =>
                total +
                elementScore.question_answers.filter(
                  (qa: any) => qa.is_answered
                ).length,
              0
            )}
            )
          </button>

          <button
            className={filter === 'Not Answered' ? 'active' : ''}
            onClick={() => setFilter('Not Answered')}
          >
            Not Answered (
            {Object.values(results.element_scores).reduce(
              (total: number, elementScore: any) =>
                total +
                elementScore.question_answers.filter(
                  (qa: any) => !qa.is_answered
                ).length,
              0
            )}
            )
          </button>
        </div>

        {Object.values(results.element_scores).map(
          (elementScore: any) => (
            <div
              key={elementScore.element}
              className="element-questions"
            >

              {elementScore.question_answers
                .filter((qa: any) => {
                  if (filter === 'Answered') return qa.is_answered;
                  if (filter === 'Not Answered') return !qa.is_answered;
                  return true;
                })
                .map((qa: any) => (
                  <div
                    key={qa.question_id}
                    className="question-item"
                  >
                    <h3>
                      {qa.question_sequence}. {qa.question_title}
                    </h3>

                    <div className="answer-item">
                      {qa.is_reflection ? (
                        <p>
                          <strong>Reflection Prompt:</strong>{' '}
                          {qa.reflection_prompt}
                        </p>
                      ) : qa.is_answered ? (
                        <p>
                          <strong>Answer:</strong> {qa.answer_text} (Score:{' '}
                          {qa.answer_value}/{qa.max_score})
                        </p>
                      ) : (
                        <p>
                          <strong>Answer:</strong> Not answered
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )
        )}
      </div>
    )}
  </div>
)}
      
    </div>
  );
}