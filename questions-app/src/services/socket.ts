import { io, Socket } from "socket.io-client";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const socket: Socket = io(BASE_URL);

export const subscribeToQuestions = (callback: (data: { question: string; options: string[] }) => void) => {
  socket.on("question", callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;
