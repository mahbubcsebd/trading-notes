'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuizQuestion {
  id: string;
  question: { en: string; bn: string };
  options: Array<{ en: string; bn: string }>;
  correctIndex: number;
  explanation: { en: string; bn: string };
}

interface PatternQuizProps {
  questions: QuizQuestion[];
  lang: 'en' | 'bn';
}

export function PatternQuiz({ questions, lang }: PatternQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const isEn = lang === 'en';

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    // Only allow selecting if not already answered
    if (selectedAnswers[questionIndex] !== undefined) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const isCompleted = totalAnswered === questions.length;

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-bold">
            <HelpCircle size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {isEn ? 'Pattern Mastery Quiz' : 'প্যাটার্ন মাস্টারি কুইজ'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isEn
                ? 'Test your understanding before trading live. Master the rules & risk sizing.'
                : 'লাইভ ট্রেড করার আগে আপনার প্রস্তুতি পরীক্ষা করুন। নিয়ম ও রিস্ক ক্যালকুলেশন যাচাই করুন।'}
            </p>
          </div>
        </div>

        {/* Score indicator */}
        <div className="flex items-center gap-3 bg-panel/80 px-4 py-2.5 rounded-xl border border-border/80 shrink-0">
          <div className="text-right">
            <div className="text-xs font-mono text-muted-foreground uppercase">
              {isEn ? 'Score' : 'স্কোর'}
            </div>
            <div className="text-lg font-mono font-bold text-gold">
              {correctCount} / {questions.length}
            </div>
          </div>
          {isCompleted && (
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-card border border-border/80 hover:border-gold/50 text-muted-foreground hover:text-gold transition-colors"
              title={isEn ? 'Reset Quiz' : 'পুনরায় শুরু করুন'}
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div
          className={cn(
            'p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in duration-300',
            correctCount === questions.length
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-gold/10 border-gold/30 text-gold'
          )}
        >
          <Award size={24} className="shrink-0" />
          <div className="text-sm">
            <strong>
              {correctCount === questions.length
                ? isEn
                  ? 'Perfect Score! 100% Mastery'
                  : 'চমৎকার! ১০০% নির্ভুল ফলাফল!'
                : isEn
                ? `You scored ${correctCount} out of ${questions.length}.`
                : `আপনি ${questions.length}টির মধ্যে ${correctCount}টি সঠিক উত্তর দিয়েছেন।`}
            </strong>
            <p className="text-xs opacity-80 mt-0.5">
              {correctCount === questions.length
                ? isEn
                  ? 'You thoroughly understand execution, confirmation, and risk sizing rules.'
                  : 'আপনি এক্সিকিউশন, কনফার্মেশন ও রিস্ক সাইজিং নিয়মাবলী সঠিকভাবে আয়ত্ত করেছেন।'
                : isEn
                ? 'Review the explanations below to refine your strategy rules.'
                : 'আপনার কৌশল আরও নিখুঁত করতে নিচের ব্যাখ্যাগুলো লক্ষ্য করুন।'}
            </p>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selected = selectedAnswers[qIdx];
          const hasAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id || qIdx}
              className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-panel/50 space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-bold text-foreground shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <p className="text-base font-semibold text-foreground leading-relaxed">
                  {q.question[lang]}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 pt-1 pl-9">
                {q.options.map((opt, optIdx) => {
                  const isThisOptionSelected = selected === optIdx;
                  const isThisOptionCorrect = q.correctIndex === optIdx;

                  let optionStyle =
                    'border-border/80 bg-card/60 hover:bg-card hover:border-border text-foreground';

                  if (hasAnswered) {
                    if (isThisOptionCorrect) {
                      optionStyle =
                        'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-medium';
                    } else if (isThisOptionSelected && !isCorrect) {
                      optionStyle =
                        'border-rose-500/50 bg-rose-500/10 text-rose-300';
                    } else {
                      optionStyle = 'opacity-50 border-border/40 bg-card/30 text-muted-foreground';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-xl border text-sm transition-all duration-150 flex items-center justify-between gap-3',
                        optionStyle
                      )}
                    >
                      <span className="leading-relaxed">{opt[lang]}</span>
                      {hasAnswered && isThisOptionCorrect && (
                        <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                      )}
                      {hasAnswered && isThisOptionSelected && !isCorrect && (
                        <XCircle size={16} className="text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {hasAnswered && (
                <div
                  className={cn(
                    'mt-3 ml-9 p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200',
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                      : 'bg-panel border-border/80 text-muted-foreground'
                  )}
                >
                  <strong
                    className={cn(
                      'block uppercase font-mono mb-1',
                      isCorrect ? 'text-emerald-400' : 'text-gold'
                    )}
                  >
                    {isCorrect
                      ? isEn
                        ? '✓ Correct Analysis:'
                        : '✓ সঠিক ব্যাখ্যা:'
                      : isEn
                      ? '💡 Why this matters:'
                      : '💡 সঠিক সমাধান ও ব্যাখ্যা:'}
                  </strong>
                  {q.explanation[lang]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
