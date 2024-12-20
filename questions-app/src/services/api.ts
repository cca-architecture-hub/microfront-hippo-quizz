const BASE_URL = import.meta.env.VITE_BASE_URL;

export const sendAnswer = async (answerIndex: number, id: string): Promise<void> => {
  await fetch(`${BASE_URL}/api/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answerIndex, id }),
  });
};
