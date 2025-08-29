import { Injectable, Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { removeUser, setUser } from "./storage";

@Injectable()
export class SocketService {
  private logger = new Logger('WsGateway');
  private io: Server;
  constructor(

  ) { }
  setServerInstance(server: Server) {
    this.io = server;
  }



  getServerInstance(): Server {
    return this.io;
  }


  async handleConnection(socket: Socket) {
    this.logger.log(`Client connected: ${socket.id}`);
    const userId = socket.handshake.query.userId as string;
    const fcmToken = socket.handshake.query.fcmToken as string;
    setUser(userId, socket.id, fcmToken);
  }


  async handleDisconnect(socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);
    removeUser(socket.data.userId);
  }
}
