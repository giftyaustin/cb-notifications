// import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect } from 'react';
// import { setupNotificationListeners } from './notifications/notificationListeners';
// import { setupFcmListeners } from './notifications/fcmListeners';
import notifee from '@notifee/react-native';
import { createNotificationChannels } from './notifications/createNotificationChannels';

const useFCMSetup = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const settings = await notifee.getNotificationSettings();

          if (settings.authorizationStatus === 0) {
            const status = await notifee.requestPermission();
            if (status.authorizationStatus !== 1) {
              console.warn('Notification permission not granted');
            }
          }
          // const permission = await PermissionsAndroid.request(
          //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          // );
          // if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          //   console.warn('Notification permission not granted');
          //   return;
          // }
        }

        // if (Platform.OS === 'ios') {
        //   const authStatus = await messaging().requestPermission();
        //   const enabled =
        //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        //   if (!enabled) {
        //     console.warn('iOS notification permission not granted');
        //     return;
        //   }
        // }

        await createNotificationChannels();
        // setupNotificationListeners();
        // setupFcmListeners();
      } catch (error) {
        console.error('FCM setup failed:', error);
      }
    };

    initializeNotifications();
  }, []);
};

export default useFCMSetup;
