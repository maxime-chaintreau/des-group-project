import { io } from "socket.io-client";
import { getToken } from "./api/auth";

const URL = (process.env.REACT_APP_SOCKET_URL || "/").replace(/\/+$/, "") || "/";

let socket = null;

export function connectSocket() {
  if (socket) return socket;

  const token = getToken();
  if (!token) {
    console.error("Socket connect failed: missing auth token");
    return null;
  }

  socket = io(URL, {
    path: "/socket.io",
    auth: { token },
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connect_error:", error);
  });

  socket.on("disconnect", (reason) => {
    console.warn("Socket disconnected:", reason);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket() {
  return socket;
}
