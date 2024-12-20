import { io, Socket } from "socket.io-client";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const socket: Socket = io(BASE_URL);

export const subscribeToRank = (callback: (data: { [key: string]: number }) => void) => {
  socket.on("rank", callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;
