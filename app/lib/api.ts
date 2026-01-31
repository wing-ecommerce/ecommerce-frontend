// helper to call backend with JWT token
export async function apiFetch(endpoint: string, options: any = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8080/api/v1${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "API Error");
  }

  return res.json();
}
