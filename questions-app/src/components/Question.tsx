import React from "react";

type QuestionProps = {
  question: string;
  category: string;
};

const Question: React.FC<QuestionProps> = ({ question, category }) => (
  <div>
    <h2>{category}</h2>
    <p>{question}</p>
  </div>
);

export default Question;
