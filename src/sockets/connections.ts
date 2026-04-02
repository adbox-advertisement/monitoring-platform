import { io, type Socket } from "socket.io-client";
import { Subject } from "rxjs";
import { Storage } from "../helpers/local.storage";
import { ConnectionEnum } from "./enum";

const url = import.meta.env.VITE_SOCKET_URL_NEW;
const listenerSubject = new Subject<any>();
let socket: Socket | null = null;
const subscriptions = new Set<string>();

const emitSubscribe = (application: string) => {
  if (!socket?.connected) return;
  console.log("[socketService] emit subscribe", { application });
  socket.emit("subscribe", { application });
};

const emitUnsubscribe = (application: string) => {
  if (!socket?.connected) return;
  console.log("[socketService] emit unsubscribe", { application });
  socket.emit("unsubscribe", { application });
};

const initSocket = () => {
  if (!url) {
    listenerSubject.next({
      listener: "connection",
      data: { stage: ConnectionEnum.disconnected },
    });
    return null;
  }

  // Already connected — replay subscriptions immediately
  if (socket) {
    if (socket.connected) {
      subscriptions.forEach(emitSubscribe);
    }
    return socket;
  }

  const token = Storage.getToken();

  listenerSubject.next({
    listener: "connection",
    data: { stage: ConnectionEnum.connecting },
  });

  socket = io(url, {
    reconnection: true,
    reconnectionDelay: 5000,
    reconnectionAttempts: 5,
    autoConnect: true,
    ...(token ? { extraHeaders: { authorization: `Bearer ${token}` } } : {}),
  });

  socket.on("connect", () => {
    console.log("[socketService] connected, replaying subscriptions:", [
      ...subscriptions,
    ]);
    listenerSubject.next({
      listener: "connection",
      data: { stage: ConnectionEnum.connected },
    });
    // Replay all pending subscriptions
    subscriptions.forEach(emitSubscribe);
  });

  socket.on("disconnect", () => {
    listenerSubject.next({
      listener: "connection",
      data: { stage: ConnectionEnum.disconnected },
    });
  });

  socket.io.on("reconnect_attempt", () => {
    listenerSubject.next({
      listener: "connection",
      data: { stage: ConnectionEnum.reconnecting },
    });
  });

  socket.io.on("reconnect_failed", async () => {
    listenerSubject.next({
      listener: "connection",
      data: { stage: ConnectionEnum.disconnected },
    });
    if (socket) await destroySocket(socket);
  });

  socket.on("connect_error", (err) => {
    console.error("[socketService] connect_error", err.message);
    listenerSubject.next({
      listener: "connection",
      data: { stage: ConnectionEnum.disconnected },
    });
  });

  socket.on("subscribed", (payload) => {
    console.log("[socketService] subscribed confirmed", payload);
  });

  return socket;
};

const destroySocket = async (s: Socket) => {
  s.disconnect();
  socket = null;
  subscriptions.clear();
  listenerSubject.next({
    listener: "connection",
    data: { stage: ConnectionEnum.disconnected },
  });
};

const subscribe = (application: string) => {
  subscriptions.add(application);
  // If socket is already connected, emit immediately
  // If not yet connected, it will be replayed on the 'connect' event
  emitSubscribe(application);
};

const unsubscribe = (application: string) => {
  subscriptions.delete(application);
  emitUnsubscribe(application);
};

export const socketService = {
  initSocket,
  destroySocket,
  subscribe,
  unsubscribe,
  listener$: listenerSubject.asObservable(),
  get socket() {
    return socket;
  },
};
