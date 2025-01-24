import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

type AnswerProps = {
  options: string[];
  onAnswer: (answer: number) => void;
};

const Answer: React.FC<AnswerProps> = ({ options, onAnswer }) => {
  const [submited, setSubmited] = useState<number | null>(null);

  useEffect(() => {
    setSubmited(null);
  }, [options]);

  const handleAnswer = (answerIndex: number) => {   
    if(submited !== null) return;
    onAnswer(answerIndex);
    setSubmited(answerIndex);    
  };

  if (!options) {
    return null;
  }
  
  return (
  <div className="options">
    {options.map((option, index) => (
      <Button key={index} onClick={() => handleAnswer(index)} disabled={submited !== null && submited !== index} >
        {option}
      </Button>
    ))}
  </div>)
};


export default Answer;
