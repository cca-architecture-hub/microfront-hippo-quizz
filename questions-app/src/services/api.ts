const BASE_URL = "http://localhost:3000/api";

export const sendAnswer = async (answer: string): Promise<void> => {
  await fetch(`${BASE_URL}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer }),
  });
};
