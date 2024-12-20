import { User } from "@/store";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const joinUser = async (name: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/api/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  return response.json();
};