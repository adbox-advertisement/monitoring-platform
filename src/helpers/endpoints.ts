const withServiceQuery = (path: string, application?: string) => {
  if (!application) {
    return path;
  }

  const params = new URLSearchParams({ application });
  return `${path}?${params.toString()}`;
};

const serviceName = {
  API_GATEWAY: "api-gateway",
  ADBOX_BACKEND: "adbox-backend",
  TRANSCODING: "transcoding",
  RESOLUTIONS: "resolutions",
  NOTIFICATION: "notification",
} as const;

const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
  },
  users: {
    getAll: "/users",
    getById: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  serviceName,
  monitoring: {
    getAudits: (application?: string) =>
      withServiceQuery("/monitoring/audits", application),
    getErrors: (application?: string) =>
      withServiceQuery("/monitoring/errors", application),
    getServices: (application?: string) =>
      withServiceQuery("/monitoring/services", application),
  },
  socketEvents: {
    emitsevents: {
      subscribe: "subscribe",
      unsubscribe: "unsubscribe",
    },
    listenEvents: {
      logService: "log:service",
      logError: "log:error",
      logAudit: "log:audit",
    },
  },
};

export default endpoints;
