import React from "react";

type AnswerProps = {
  options: string[];
  onAnswer: (answer: string) => void;
};

const Answer: React.FC<AnswerProps> = ({ options, onAnswer }) => (
  <div>
    {options.map((option, index) => (
      <button key={index} onClick={() => onAnswer(option)}>
        {option}
      </button>
    ))}
  </div>
);

export default Answer;
