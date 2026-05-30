import { authHeaders } from "./auth";

export async function getUser() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Not logged in");
  }

  const data = await response.json();
  return data;
}