import { io } from "socket.io-client";
import { getToken } from "./api/auth";

const URL = process.env.REACT_APP_SOCKET_URL;

let socket = null;

export function connectSocket() {
  const token = getToken();
  socket = io(URL, {
    auth: { token },
    transports: ["websocket", "polling"],
  });
}

export function disconnectSocket() {
  if (socket?.connected) socket.disconnect();
  socket = null;
}

export function getSocket() {
  return socket;
}
