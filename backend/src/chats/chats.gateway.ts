import { Logger, UseFilters } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from 'src/socket/socket.service';
import { getUser } from 'src/socket/storage';

type Message = {
  senderId: string;
  text: string;
  receiverId: string;
  timestamp?: Date | string;
};

@WebSocketGateway()
export class ChatsGateway {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('message')
  handleIncomingMessage(socket: Socket, message: Message) {
    const io = this.socketService.getServerInstance();
    console.log('Received message:', message);
    const receiverId = message.receiverId;
    const receiverInfo = getUser(receiverId);
    if (!receiverInfo) {
      console.error('Receiver not found:', receiverId);
      return;
    }
    io.to(receiverInfo.socketId).emit('message', message);
  }
}
