import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketModule } from './socket/ws.module';
import { WsGateway } from './socket/socket.gateway';
import { SocketService } from './socket/socket.service';
import { ChatsModule } from './chats/chats.module';
import { ChatsGateway } from './chats/chats.gateway';



@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WsGateway, SocketService, ChatsGateway],
})
export class AppModule {}
