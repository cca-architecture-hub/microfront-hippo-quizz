import React, { useState, useEffect, useCallback } from "react";
import Question from "./components/Question";
import Answer from "./components/Answer";
import { subscribeToQuestions } from "./services/socket";
import { sendAnswer } from "./services/api";
import useUserStore from "store/store";
import { Progress } from "@/components/ui/progress"

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const {user}  = useUserStore();
  const [progress, setProgress] = useState(100);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  
  const resetTimer = useCallback((roundTime: number) => {
    if (timerId) {
      clearInterval(timerId);
    }
    
    setProgress(100);
    
    const interval = 100;
    const decrementPerStep = (100 * interval) / (roundTime);
    
    const newTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.max(0, prev - decrementPerStep);
        if (newProgress <= 0) {
          clearInterval(newTimer);
          return 0;
        }
        return newProgress;
      });
    }, interval);
    
    setTimerId(newTimer);
  }, [timerId]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribeToQuestions((data: any) => {
      setQuestion(data.text);
      setCategory(data.category);
      setOptions(data.options);
      resetTimer(data.roundTime);
    });

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, []);

  const handleAnswer = (answerIndex: number) => {
    const userId = user.id || '';
    sendAnswer(answerIndex, userId).catch(console.error);
  };

  return (
    <div className="questionContainer">
      <h1>Question</h1>
      <Question question={question} category={category} />
      <Answer options={options} onAnswer={handleAnswer} />
      <Progress value={progress} />
    </div>
  );
};

export default App;
