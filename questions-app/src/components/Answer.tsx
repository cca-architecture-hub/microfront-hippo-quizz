import React from "react";
import { Button } from "@/components/ui/button"

type AnswerProps = {
  options: string[];
  onAnswer: (answer: number) => void;
};

const Answer: React.FC<AnswerProps> = ({ options, onAnswer }) => (
  <div className="options">
    {options.map((option, index) => (
      <Button key={index} onClick={() => onAnswer(index)}>
        {option}
      </Button>
    ))}
  </div>
);

export default Answer;
