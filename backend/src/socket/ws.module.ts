import { Global, Module } from "@nestjs/common";
import { WebSocketGateway } from "@nestjs/websockets/decorators/socket-gateway.decorator";
import { WsGateway } from "./socket.gateway";
import { SocketService } from "./socket.service";



@Global()
@Module({
  imports: [

  ],
  providers: [
    WsGateway, SocketService
  ],
  exports: [WsGateway],
})
export class WebSocketModule { }
