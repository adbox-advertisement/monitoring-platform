import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Toaster, toast } from "sonner";
import { useAuth } from "./auth-provider";
import { socketService } from "#/sockets/connections";
import { ConnectionEnum, type ConnectionEnum as ConnectionStatus } from "#/sockets/enum";

interface SocketContextValue {
  status: ConnectionStatus;
}

const SOCKET_TOAST_ID = "socket-connection-status";

const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionEnum.disconnected);

  useEffect(() => {
    const subscription = socketService.listener$.subscribe((event) => {
      if (event?.listener !== "connection") {
        return;
      }

      const nextStatus = event.data?.stage as ConnectionStatus;
      if (!nextStatus) {
        return;
      }

      setStatus(nextStatus);

      if (nextStatus === ConnectionEnum.connected) {
        toast.success("Socket connected", {
          id: SOCKET_TOAST_ID,
          description: "Real-time updates are live.",
        });
      } else if (nextStatus === ConnectionEnum.reconnecting) {
        toast.warning("Socket reconnecting", {
          id: SOCKET_TOAST_ID,
          description: "Trying to restore the real-time stream.",
        });
      } else if (nextStatus === ConnectionEnum.connecting) {
        toast("Connecting to socket", {
          id: SOCKET_TOAST_ID,
          description: "Establishing a real-time session.",
        });
      } else {
        toast.error("Socket disconnected", {
          id: SOCKET_TOAST_ID,
          description: "Real-time updates are offline.",
        });
      }
    });

    if (isAuthenticated) {
      socketService.initSocket();
    } else {
      setStatus(ConnectionEnum.disconnected);
      if (socketService.socket) {
        void socketService.destroySocket(socketService.socket);
      }
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ status }}>
      {children}
      <Toaster richColors closeButton position="top-right" theme="dark" />
    </SocketContext.Provider>
  );
}

export function useSocketStatus() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("SocketProvider missing");
  }

  return context;
}
