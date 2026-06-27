'use client';

import { useState, useMemo, useCallback } from 'react';
import { emojis } from '@/data/emojis';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

interface QuizGameProps {
  locale: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const QUIZ_LENGTH = 10;
const OPTIONS_COUNT = 4;

export default function QuizGame({ locale }: QuizGameProps) {
  const [questions, setQuestions] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  // Generate quiz questions
  const quizData = useMemo(() => {
    if (!gameStarted) return [];
    const pool = shuffleArray(emojis).slice(0, QUIZ_LENGTH);
    return pool.map((emoji) => {
      const correct = emoji.name;
      const wrongOptions = shuffleArray(
        emojis.filter(e => e.name !== correct)
      ).slice(0, OPTIONS_COUNT - 1).map(e => e.name);
      const options = shuffleArray([correct, ...wrongOptions]);
      return {
        emoji: emoji.char,
        correct,
        options,
      };
    });
  }, [gameStarted, questions]);

  const handleStart = () => {
    setGameStarted(true);
    setGameEnded(false);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuestions(q => q + 1);
  };

  const handleAnswer = (option: string, index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (option === quizData[currentIndex].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_LENGTH - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameEnded(true);
    }
  };

  if (!gameStarted) {
    return (
      <>
        <Navbar locale={locale} />
        <main className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-2xl text-center">
            <div className="text-7xl mb-6">🎯</div>
            <h1 className="text-4xl font-bold mb-4">Emoji Quiz</h1>
            <p className="text-lg text-slate-600 mb-8">
              Test your emoji knowledge! Can you guess all {QUIZ_LENGTH} emojis correctly?
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 text-left">
              <h2 className="font-semibold text-amber-900 mb-3">📋 How to Play</h2>
              <ul className="text-slate-700 space-y-2">
                <li>• You&apos;ll see an emoji and {OPTIONS_COUNT} name options</li>
                <li>• Pick the correct meaning as fast as you can</li>
                <li>• {QUIZ_LENGTH} questions per round</li>
                <li>• Get a score out of {QUIZ_LENGTH} at the end!</li>
              </ul>
            </div>
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-amber-500 text-white text-lg font-semibold rounded-xl hover:bg-amber-600 transition shadow-lg hover:shadow-xl"
            >
              🚀 Start Quiz
            </button>
          </div>
        </main>
        <Footer locale={locale} />
      </>
    );
  }

  if (gameEnded) {
    const percentage = Math.round((score / QUIZ_LENGTH) * 100);
    let message = '';
    let emoji = '';
    if (percentage === 100) { message = 'Perfect! You\'re an emoji master!'; emoji = '🏆'; }
    else if (percentage >= 80) { message = 'Excellent! You know your emojis well!'; emoji = '🌟'; }
    else if (percentage >= 60) { message = 'Good job! Keep practicing!'; emoji = '👏'; }
    else if (percentage >= 40) { message = 'Not bad! Try again to improve!'; emoji = '💪'; }
    else { message = 'Keep learning! You\'ll get there!'; emoji = '📚'; }

    return (
      <>
        <Navbar locale={locale} />
        <main className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-2xl text-center">
            <div className="text-8xl mb-6">{emoji}</div>
            <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
            <div className="text-6xl font-bold text-amber-500 mb-2">{score}/{QUIZ_LENGTH}</div>
            <p className="text-xl text-slate-600 mb-2">{percentage}% Correct</p>
            <p className="text-lg text-slate-700 mb-8">{message}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleStart}
                className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition"
              >
                🔄 Play Again
              </button>
              <Link
                href={`/${locale}`}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition"
              >
                🏠 Home
              </Link>
            </div>
          </div>
        </main>
        <Footer locale={locale} />
      </>
    );
  }

  const current = quizData[currentIndex];

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-[70vh] px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-slate-500">
              Question {currentIndex + 1} of {QUIZ_LENGTH}
            </span>
            <span className="text-sm font-medium text-amber-600">
              Score: {score}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_LENGTH) * 100}%` }}
            />
          </div>

          {/* Emoji display */}
          <div className="text-center mb-8">
            <div className="text-9xl mb-4 select-none">{current?.emoji}</div>
            <p className="text-slate-500">What does this emoji mean?</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {current?.options.map((option, i) => {
              let className = 'p-4 rounded-xl border-2 text-left font-medium transition-all ';
              if (showResult) {
                if (option === current.correct) {
                  className += 'border-green-500 bg-green-50 text-green-900';
                } else if (i === selectedAnswer) {
                  className += 'border-red-500 bg-red-50 text-red-900';
                } else {
                  className += 'border-slate-200 bg-white text-slate-400';
                }
              } else {
                className += 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50 cursor-pointer text-slate-700';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(option, i)}
                  disabled={showResult}
                  className={className}
                >
                  <span className="flex items-center gap-2">
                    {showResult && option === current.correct && '✅ '}
                    {showResult && i === selectedAnswer && option !== current.correct && '❌ '}
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next button */}
          {showResult && (
            <div className="text-center">
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition shadow"
              >
                {currentIndex < QUIZ_LENGTH - 1 ? 'Next Question →' : 'See Results 🎉'}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
