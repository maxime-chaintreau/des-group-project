import { setToken } from "./auth";

export async function register(email, password, role, profileData) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role, profileData }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Register failed");
  }

  const data = await response.json();
  setToken(data.token);
  return data.user;
}