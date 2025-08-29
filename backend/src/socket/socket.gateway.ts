import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SocketService } from "./socket.service";


@WebSocketGateway({
    cors: {
        origin: '*', // allow RN dev client
    },
})
@WebSocketGateway({ cors: true, pingTimeout: 30000, pingInterval: 25000 })
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(
        private readonly socketService: SocketService,
    ) { }
    handleDisconnect(client: Socket) {
        this.socketService.handleDisconnect(client);
    }
    afterInit(server: Server) {
        this.socketService.setServerInstance(server);
    }

    async handleConnection(socket: Socket) {
        this.socketService.handleConnection(socket);
    }
}
