import React from 'react'

interface CategoryCardProps {
  name: string;
  percentage: string;
  best: string;
  amount: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, percentage, amount }) => {
    return (
      <div
        style={{
          border: "2px solid black",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3 style={{ margin: "0" }}>{name}</h3>
        </div>
        <div>
        <h3 style={{ margin: "0" }}>{percentage}%</h3>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            <strong>Total: </strong>
            {amount}
          </p>
        </div>
        
      </div>
    );
  };