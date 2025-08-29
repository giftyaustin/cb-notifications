import messaging, { getMessaging, getToken } from '@react-native-firebase/messaging';
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserId, socketURL } from './config';
import { getApp } from '@react-native-firebase/app';

let socket: Socket<any, any> | null = null;

// Initialize the socket connection with the access token
export const initSocket = async (
): Promise<Socket<any, any>> => {
  if (socket) {
    console.log(`Returning existing socket instance:`, socket);
    return socket;
  }
  console.log('Creating new socket instance');

  const app = getApp();
  const messaging = getMessaging(app);
  
  const fcmToken = await getToken(messaging);
  console.log('FCM Token:', fcmToken);
  const userId = await getUserId();
  console.log('User ID:', userId);

  socket = io(socketURL, {
    query: {
      fcmToken: fcmToken,
      userId: userId
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
}


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

  sock.on('disconnect', (reason) => {
    console.log('[Socket] Disconnected:', reason);
  });

  sock.on('connect_error', (error) => {
    console.error('[Socket] Connection Error:', error.message);
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
};



export type AppSocket = Socket<any, any>;
