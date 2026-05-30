export function getToken() {
  return localStorage.getItem("jwtToken");
}

export function setToken(token) {
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("hasToken", "true");
}

export function clearToken() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("hasToken");
}

export function authHeaders(extraHeaders = {}) {
  const token = getToken();
  return token
    ? { Authorization: `Bearer ${token}`, ...extraHeaders }
    : { ...extraHeaders };
}