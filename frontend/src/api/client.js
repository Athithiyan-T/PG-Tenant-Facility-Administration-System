const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || "Request failed";
    throw new Error(message);
  }
  return data;
}

