import { getUserId } from "../config";
import { getSocket } from "../socket"

export const sendMessage = async (text: string, receiverId: string) => {
    const socket = await getSocket();
    const senderId = await getUserId();
    socket.emit('message', { text, receiverId, senderId });
}