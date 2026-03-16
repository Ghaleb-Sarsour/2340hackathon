"use client";

import { useMemo, useState } from "react";
import { RotateCcw, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type DiagramQuizProps = {
  title?: string;
  description?: string;
  questions: QuizQuestion[];
};

export function DiagramQuiz({
  title = "Quick Quiz",
  description = "Answer all 5 questions, then check your score.",
  questions,
}: DiagramQuizProps) {
  const initialSelections = useMemo(() => {
    return Object.fromEntries(questions.map((q) => [q.id, null])) as Record<string, number | null>;
  }, [questions]);

  const [selections, setSelections] = useState<Record<string, number | null>>(initialSelections);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const score = useMemo(() => {
    return questions.reduce((count, q) => {
      const selected = selections[q.id];
      if (selected === q.correctIndex) return count + 1;
      return count;
    }, 0);
  }, [questions, selections]);

  const answeredCount = useMemo(() => {
    return questions.reduce((count, q) => (selections[q.id] === null ? count : count + 1), 0);
  }, [questions, selections]);

  const reset = () => {
    setSelections(initialSelections);
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <HelpCircle className="h-5 w-5 text-violet-400" />
          {title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="space-y-5">
        {questions.map((q, index) => {
          const selected = selections[q.id];
          const isCorrect = isSubmitted && selected === q.correctIndex;
          const isWrong = isSubmitted && selected !== null && selected !== q.correctIndex;

          return (
            <div key={q.id} className="rounded-xl border border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium leading-relaxed">
                  {index + 1}. {q.question}
                </p>
                {isSubmitted && (
                  <span className={cn("mt-0.5 inline-flex items-center gap-1 text-xs font-medium", isCorrect ? "text-emerald-400" : "text-rose-400")}>
                    {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-2">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selected === optIndex;
                  const showCorrect = isSubmitted && optIndex === q.correctIndex;
                  const showWrong = isSubmitted && isSelected && optIndex !== q.correctIndex;

                  return (
                    <label
                      key={opt}
                      className={cn(
                        "flex items-start gap-3 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors",
                        isSelected ? "border-primary/60 bg-primary/10" : "border-border hover:bg-secondary/30",
                        isSubmitted && showCorrect && "border-emerald-500/50 bg-emerald-500/10",
                        isSubmitted && showWrong && "border-rose-500/50 bg-rose-500/10",
                        isSubmitted && "cursor-default"
                      )}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        className="mt-0.5"
                        checked={isSelected}
                        disabled={isSubmitted}
                        onChange={() => setSelections((prev) => ({ ...prev, [q.id]: optIndex }))}
                      />
                      <span className="leading-relaxed">{opt}</span>
                    </label>
                  );
                })}
              </div>

              {isSubmitted && (
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Explanation:</span> {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="text-sm text-muted-foreground">
          {isSubmitted ? (
            <span className="text-foreground font-medium">
              Score: {score}/{questions.length}
            </span>
          ) : (
            <span>
              Answered: <span className="text-foreground font-medium">{answeredCount}</span>/{questions.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isSubmitted ? (
            <button
              onClick={() => setIsSubmitted(true)}
              disabled={answeredCount !== questions.length}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                answeredCount === questions.length
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              Check answers
            </button>
          ) : (
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

