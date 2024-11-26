import { io, Socket } from "socket.io-client";
import Env from "./env";

let socket: Socket;
export const getSocket = (): Socket => {
  console.log("GETTING SOCKET..")
  if (!socket) {
    console.log("NO SOCKET...")
    socket = io(Env.BACKEND_URL, { autoConnect: false });
    
  }
  console.log("FINAL SOCKET : ", socket);
  return socket;
};
