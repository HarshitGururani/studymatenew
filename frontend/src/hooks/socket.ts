import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const scoketUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(scoketUrl, {
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.io server", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};
