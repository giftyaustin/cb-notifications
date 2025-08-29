import messaging from '@react-native-firebase/messaging';
import { displayIncomingCallNotification } from './displayNotifications';

export const setupFcmListeners = () => {
  messaging().onMessage(async (remoteMessage) => {
    // Handle foreground FCM message
    console.log('FCM Message:', remoteMessage);
  });
};
