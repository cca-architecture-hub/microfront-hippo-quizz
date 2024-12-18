import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Answer from "./components/Answer";
import { subscribeToQuestions } from "./services/socket";
import { sendAnswer } from "./services/api";

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribeToQuestions((data: any) => {
      setQuestion(data.text);
      setCategory(data.category);
      setOptions(data.options);
    });
  }, []);

  const handleAnswer = (answer: string) => {
    sendAnswer(answer).catch(console.error);
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
