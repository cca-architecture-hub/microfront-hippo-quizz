import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000");

export const subscribeToQuestions = (callback: (data: { question: string; options: string[] }) => void) => {
  socket.on("question", callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;
