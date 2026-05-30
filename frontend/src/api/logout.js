import { clearToken } from "./auth";
import { disconnectSocket } from "../socket";

export async function logout() {
  try {
    clearToken();
    disconnectSocket();
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}