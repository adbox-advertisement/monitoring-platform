import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { Storage } from "./local.storage";

const BASE_URL_V1 = import.meta.env.VITE_BASE_URL_NEW;

const apiClient = axios.create({
  baseURL: BASE_URL_V1,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Refresh token state ───────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// ── Request interceptor ───────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = Storage.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token found in storage");
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh on 401, and not if this is already a retry
    // or if it's the refresh endpoint itself failing
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      if (error.response?.status === 401) {
        Storage.clearToken?.();
      }
      return Promise.reject(error);
    }

    const refreshToken = Storage.getRefreshToken?.();
    if (!refreshToken) {
      Storage.clearToken?.();
      return Promise.reject(error);
    }

    // If a refresh is already in flight, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // Kick off the refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${BASE_URL_V1}/auth/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );

      const newAccessToken: string = data.accessToken;
      const newRefreshToken: string | undefined = data.refreshToken;

      Storage.setToken(newAccessToken);
      if (newRefreshToken) {
        Storage.setRefreshToken?.(newRefreshToken);
      }

      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      Storage.clearToken?.();
      Storage.clearRefreshToken?.();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

// ── Helpers ───────────────────────────────────────────────────────────────────
const createConfig = (
  additionalConfig?: AxiosRequestConfig,
): AxiosRequestConfig => ({ ...additionalConfig });

// ── API methods ───────────────────────────────────────────────────────────────
const post_api = (route: string, data: any, config?: AxiosRequestConfig) =>
  apiClient.post(route, data, createConfig(config));

const get_api = (route: string, config?: AxiosRequestConfig) =>
  apiClient.get(route, createConfig(config));

const put_api = (route: string, data: any, config?: AxiosRequestConfig) =>
  apiClient.put(route, data, createConfig(config));

const patch_api = (route: string, data: any, config?: AxiosRequestConfig) =>
  apiClient.patch(route, data, createConfig(config));

const delete_api = (route: string, config?: AxiosRequestConfig) =>
  apiClient.delete(route, createConfig(config));

const ApiService = {
  post_api,
  get_api,
  put_api,
  patch_api,
  delete_api,
  client: apiClient,
};

export default ApiService;
