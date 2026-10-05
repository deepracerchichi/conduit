const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000"

export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status
    }
}

export function getToken(): string | null {
    return localStorage.getItem("token");
}

export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

export function clearToken(): void {
  localStorage.removeItem("token");
}

export function isLoggedIn(): boolean {
  return getToken() !== null;
}


export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();

    const response = await fetch(`${BASE_URL}${path}`, {

        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
            ...options.headers,
        }
    });

    if(!response.ok) {
        const body = await response.json().catch(() => null);
        const message =  body?.error?.message ??`Request failed with status ${response.status}`;
        throw new ApiError(message, response.status);
    }

    if (response.status === 204) {
    return undefined as T;
  }
    return response.json();
}


