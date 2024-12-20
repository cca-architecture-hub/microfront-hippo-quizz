import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Answer from "./components/Answer";
import { subscribeToQuestions } from "./services/socket";
import { sendAnswer } from "./services/api";
import useUserStore from "store/store";

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const {user}  = useUserStore();
  
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribeToQuestions((data: any) => {
      setQuestion(data.text);
      setCategory(data.category);
      setOptions(data.options);
    });
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
    </div>
  );
};

export default App;
