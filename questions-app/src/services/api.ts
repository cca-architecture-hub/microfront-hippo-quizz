const BASE_URL = import.meta.env.VITE_BASE_URL;

export const sendAnswer = async (answer: string): Promise<void> => {
  await fetch(`${BASE_URL}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer }),
  });
};
