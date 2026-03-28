import { tryRefreshToken } from "./authRefresh";

export async function apiFetch(domain, path = "", options = {}) {
  const url = path ? `${domain}/${path}` : domain;

  const fetchOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  if (
    fetchOptions.body &&
    typeof fetchOptions.body === "object" &&
    !(fetchOptions.body instanceof FormData)
  ) {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  const res = await fetch(url, fetchOptions);

  if (res.status === 401) {
    console.warn("Unauthorized - trying refresh...");

    await tryRefreshToken();

    const retryOptions = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    };

    if (
      retryOptions.body &&
      typeof retryOptions.body === "object" &&
      !(retryOptions.body instanceof FormData)
    ) {
      retryOptions.body = JSON.stringify(retryOptions.body);
    }

    const retryRes = await fetch(url, retryOptions);

    if (!retryRes.ok) {
      throw new Error("Request failed after refresh");
    }

    const retryData = await retryRes.json();
    return retryData.data;
  }

  const data = await res.json();

  if (!data.succeeded) {
    throw new Error(data.message || "API Error");
  }

  return data.data !== undefined ? data.data : data;
}
