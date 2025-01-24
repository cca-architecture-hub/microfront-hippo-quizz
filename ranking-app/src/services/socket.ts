import { io, Socket } from "socket.io-client";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const socket: Socket = io(BASE_URL, {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
  transports: ["websocket"],
});

export const subscribeToRank = (callback: (data: { [key: string]: number }) => void) => {
  socket.on("rank", callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;
