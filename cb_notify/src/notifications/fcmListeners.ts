import messaging from '@react-native-firebase/messaging';

export const setupFcmListeners = () => {
  messaging().onMessage(async (remoteMessage) => {
    // Handle foreground FCM message
    console.log('FCM Message:', remoteMessage);
  });
};
