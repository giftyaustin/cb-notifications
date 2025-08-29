import notifee, { EventType } from '@notifee/react-native';

export const setupNotificationListeners = () => {
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS) {
      switch (detail.pressAction?.id) {
        case 'answer':
          // navigateTo('CallScreen');
          break;
        case 'reject':
          console.log('Call rejected');
          break;
      }
    }
  });

  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS) {
      switch (detail.pressAction?.id) {
        case 'reply':
          // navigateTo(SCREENS.ChatSpecificScreen);
          break;
      }
    }
  });
};
