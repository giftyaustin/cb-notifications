import { UseFilters } from "@nestjs/common";
import { WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { SocketService } from "src/socket/socket.service";


@WebSocketGateway()
export class ChatsGateway {
    constructor(
        private readonly socketService: SocketService,
    ) {
    }

    handleIncomingMessage(socket: Socket, message: any) {
        const io = this.socketService.getServerInstance();
        io.emit('message', message);
        
    }

}
