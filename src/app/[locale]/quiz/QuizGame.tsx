'use client';

import { useState, useMemo } from 'react';
import { emojis } from '@/data/emojis';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Target, Rocket, RefreshCw, Home, Check, X, ArrowRight, PartyPopper, Trophy, Star, BookOpen } from 'lucide-react';

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

// Locale strings for quiz UI
const quizStrings: Record<string, {
  title: string; subtitle: string; howToPlay: string;
  rules: string[]; start: string; complete: string;
  correct: string; playAgain: string; home: string;
  questionOf: string; score: string; whatMean: string;
  next: string; seeResults: string;
  msg100: string; msg80: string; msg60: string; msg40: string; msg0: string;
}> = {
  en: {
    title: 'Emoji Quiz', subtitle: 'Test your emoji knowledge! Can you guess all 10 emojis correctly?',
    howToPlay: 'How to Play',
    rules: ['You\'ll see an emoji and 4 name options','Pick the correct meaning as fast as you can','10 questions per round','Get a score out of 10 at the end!'],
    start: 'Start Quiz', complete: 'Quiz Complete!', correct: 'Correct',
    playAgain: 'Play Again', home: 'Home',
    questionOf: 'Question {n} of {total}', score: 'Score:',
    whatMean: 'What does this emoji mean?', next: 'Next Question', seeResults: 'See Results',
    msg100: 'Perfect! You\'re an emoji master!', msg80: 'Excellent! You know your emojis well!',
    msg60: 'Good job! Keep practicing!', msg40: 'Not bad! Try again to improve!',
    msg0: 'Keep learning! You\'ll get there!',
  },
  'zh-TW': {
    title: '表情符號測驗', subtitle: '測試你的表情符號知識！你能猜對全部 10 個嗎？',
    howToPlay: '遊戲方式',
    rules: ['你會看到一個表情符號和 4 個選項','盡快選出正確答案','每回合 10 題','最後看看你的得分！'],
    start: '開始測驗', complete: '測驗完成！', correct: '正確',
    playAgain: '再玩一次', home: '首頁',
    questionOf: '第 {n} 題，共 {total} 題', score: '分數：',
    whatMean: '這個表情符號是什麼意思？', next: '下一題', seeResults: '查看結果',
    msg100: '完美！你是表情符號大師！', msg80: '太棒了！你很了解表情符號！',
    msg60: '做得好！繼續練習！', msg40: '還不錯！再試一次！',
    msg0: '繼續學習！你會進步的！',
  },
  es: {
    title: 'Quiz de Emojis', subtitle: '¡Pon a prueba tu conocimiento! ¿Puedes adivinar los 10 emojis?',
    howToPlay: 'Cómo jugar',
    rules: ['Verás un emoji y 4 opciones','Elige el significado correcto rápido','10 preguntas por ronda','¡Obtén tu puntuación al final!'],
    start: 'Comenzar', complete: '¡Quiz completado!', correct: 'Correcto',
    playAgain: 'Jugar de nuevo', home: 'Inicio',
    questionOf: 'Pregunta {n} de {total}', score: 'Puntuación:',
    whatMean: '¿Qué significa este emoji?', next: 'Siguiente', seeResults: 'Ver resultados',
    msg100: '¡Perfecto! ¡Eres un maestro de emojis!', msg80: '¡Excelente! ¡Conoces bien tus emojis!',
    msg60: '¡Buen trabajo! ¡Sigue practicando!', msg40: '¡No está mal! ¡Intenta de nuevo!',
    msg0: '¡Sigue aprendiendo! ¡Lo lograrás!',
  },
  ja: {
    title: '絵文字クイズ', subtitle: '絵文字の知識をテストしよう！10個全部当てられる？',
    howToPlay: '遊び方',
    rules: ['絵文字と4つの選択肢が表示されます','正しい意味を素早く選んで','1ラウンド10問','最後にスコアを確認！'],
    start: 'クイズ開始', complete: 'クイズ完了！', correct: '正解',
    playAgain: 'もう一度', home: 'ホーム',
    questionOf: '第 {n} 問 / 全 {total} 問', score: 'スコア：',
    whatMean: 'この絵文字の意味は？', next: '次の問題', seeResults: '結果を見る',
    msg100: '完璧！絵文字マスター！', msg80: '素晴らしい！絵文字に詳しい！',
    msg60: 'よくできました！練習を続けよう！', msg40: '悪くない！もう一度挑戦！',
    msg0: '諦めずに学ぼう！',
  },
};

function getStr(locale: string) {
  return quizStrings[locale] || quizStrings.en;
}

export default function QuizGame({ locale }: QuizGameProps) {
  const [questions, setQuestions] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const s = getStr(locale);

  const quizData = useMemo(() => {
    if (!gameStarted) return [];
    const pool = shuffleArray(emojis).slice(0, QUIZ_LENGTH);
    return pool.map((emoji) => {
      const correct = emoji.name;
      const wrongOptions = shuffleArray(
        emojis.filter(e => e.name !== correct)
      ).slice(0, OPTIONS_COUNT - 1).map(e => e.name);
      const options = shuffleArray([correct, ...wrongOptions]);
      return { emoji: emoji.char, correct, options };
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
      setScore(x => x + 1);
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
            <div className="mb-6 flex justify-center"><Target size={64} className="text-amber-500" /></div>
            <h1 className="text-4xl font-bold mb-4">{s.title}</h1>
            <p className="text-lg text-slate-600 mb-8">{s.subtitle}</p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 text-left">
              <h2 className="font-semibold text-amber-900 mb-3">{s.howToPlay}</h2>
              <ul className="text-slate-700 space-y-2">
                {s.rules.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white text-lg font-semibold rounded-xl hover:bg-amber-600 transition shadow-lg hover:shadow-xl"
            >
              <Rocket size={20} />
              {s.start}
            </button>
          </div>
        </main>
        <Footer locale={locale} />
      </>
    );
  }

  if (gameEnded) {
    const percentage = Math.round((score / QUIZ_LENGTH) * 100);
    let message = s.msg0;
    let Icon = BookOpen;
    if (percentage === 100) { message = s.msg100; Icon = Trophy; }
    else if (percentage >= 80) { message = s.msg80; Icon = Trophy; }
    else if (percentage >= 60) { message = s.msg60; Icon = Star; }
    else if (percentage >= 40) { message = s.msg40; Icon = Star; }
    else { message = s.msg0; Icon = BookOpen; }

    return (
      <>
        <Navbar locale={locale} />
        <main className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-2xl text-center">
            <div className="mb-6 flex justify-center"><Icon size={80} className="text-amber-500" /></div>
            <h1 className="text-4xl font-bold mb-2">{s.complete}</h1>
            <div className="text-6xl font-bold text-amber-500 mb-2">{score}/{QUIZ_LENGTH}</div>
            <p className="text-xl text-slate-600 mb-2">{percentage}% {s.correct}</p>
            <p className="text-lg text-slate-700 mb-8">{message}</p>
            <div className="flex gap-4 justify-center">
              <button onClick={handleStart} className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition">
                <RefreshCw size={18} /> {s.playAgain}
              </button>
              <Link href={`/${locale}`} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition">
                <Home size={18} /> {s.home}
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
        <div className="max-w-2xl mx-auto" role="region" aria-label="Quiz">
          {/* Progress bar */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-slate-500">
              {s.questionOf.replace('{n}', String(currentIndex + 1)).replace('{total}', String(QUIZ_LENGTH))}
            </span>
            <span className="text-sm font-medium text-amber-600">{s.score} {score}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mb-8" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={0} aria-valuemax={QUIZ_LENGTH}>
            <div className="bg-amber-500 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / QUIZ_LENGTH) * 100}%` }} />
          </div>

          {/* Emoji display */}
          <div className="text-center mb-8">
            <div className="text-9xl mb-4 select-none">{current?.emoji}</div>
            <p className="text-slate-500">{s.whatMean}</p>
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
                <button key={i} onClick={() => handleAnswer(option, i)} disabled={showResult} className={className} aria-label={option}>
                  <span className="flex items-center gap-2">
                    {showResult && option === current.correct && <Check size={16} className="text-green-600" />}
                    {showResult && i === selectedAnswer && option !== current.correct && <X size={16} className="text-red-600" />}
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next button */}
          {showResult && (
            <div className="text-center">
              <button onClick={handleNext} className="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition shadow">
                {currentIndex < QUIZ_LENGTH - 1 ? (<><ArrowRight size={18} /> {s.next}</>) : (<><PartyPopper size={18} /> {s.seeResults}</>)}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
