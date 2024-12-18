import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000");

export const subscribeToStats = (callback: (data: { [key: string]: number }) => void) => {
  socket.on("stats", callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;
