import { io } from "socket.io-client";
import { getToken } from "./api/auth";

const URL = process.env.REACT_APP_SOCKET_URL;

export const socket = io(URL, {
  autoConnect: false,
  auth: (cb) => cb({ token: getToken() }),
});

export function connectSocket() {
  if (!socket.connected) {
    socket.auth = (cb) => cb({ token: getToken() });
    socket.connect();
  }
}

export function disconnectSocket() {
  if (socket.connected) socket.disconnect();
}
