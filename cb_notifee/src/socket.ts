import {io, Socket} from 'socket.io-client';
import {getUserId, socketURL} from './config';
// import { getApp } from '@react-native-firebase/app';

let socket: Socket<any, any> | null = null;

// Initialize the socket connection with the access token
export const initSocket = async (): Promise<Socket<any, any>> => {
  if (socket) {
    console.log(`Returning existing socket instance:`, socket);
    return socket;
  }
  console.log('Creating new socket instance');

  //   const fcmToken = await messaging().getToken();
  //   console.log('FCM Token:', fcmToken);
  const userId = await getUserId();
  console.log('User ID:', userId);

  socket = io(socketURL, {
    query: {
      //   fcmToken: fcmToken,
      userId: userId,
    },
    secure: true,
    transports: ['websocket', 'polling'],
  });
  console.log('Socket instance created:', socket);
  return socket;
};

export const getSocket = async () => {
  if (!socket) {
    return await initSocket();
  }
  return socket;
};

export const connectSocket = async () => {
  const sock = await getSocket();
  registerSocketEvents(sock);
  return sock;
};

export const registerSocketEvents = (sock: Socket<any, any>) => {
  if (!sock) return;

  // Prevent duplicate bindings by clearing previous listeners
  sock.removeAllListeners();

  sock.on('connect', () => {
    console.log('[Socket] Connected:', sock.id);
  });

  sock.on('disconnect', (reason: any) => {
    console.log('[Socket] Disconnected:', reason);
  });

  sock.on('connect_error', (error: any) => {
    console.error('[Socket] Connection Error:', error);
  });

  sock.on('reconnect_attempt', (attempt: any) => {
    console.log(`[Socket] Reconnect attempt #${attempt}`);
  });

  sock.on('reconnect_failed', () => {
    console.error('[Socket] Reconnect failed');
  });

  sock.on('error', (err: any) => {
    console.error('[Socket] General error:', err);
  });

  sock.on('message', (data: any) => {
    console.log(data);
  });
};

export const sendMessage = async (message: any) => {
  const sock = await getSocket();
  sock.emit('message', message);
};

export type AppSocket = Socket<any, any>;
