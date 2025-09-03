import notifee, {
  AndroidCategory,
  AndroidChannel,
  AndroidForegroundServiceType,
  AndroidImportance,
  AndroidVisibility,
  Event,
} from '@notifee/react-native';

export const notificationChannels: Record<
  'calls' | 'screenCapture' | 'chats' | 'chats_silent',
  AndroidChannel
> = {
  calls: {
    id: 'calls',
    name: 'Calls',
    description: 'Incoming call notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  },
  screenCapture: {
    id: 'screen_capture',
    name: 'Screen Capture',
    lights: false,
    vibration: true,
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
  },
  chats: {
    id: 'chats',
    name: 'Chats',
    description: 'Incoming message notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  },
  chats_silent: {
    id: 'chats_silent',
    name: 'Chats (Silent)',
    description: 'Silent incoming message notifications',
    importance: AndroidImportance.HIGH,
  },
};

export const notificationIds = {
  incomingCall: 'incoming_call',
  screenCapture: 'screen_capture',
};

export const createNotificationChannels = async () => {
  await notifee.createChannel(notificationChannels.calls);
  await notifee.createChannel(notificationChannels.chats);
  await notifee.createChannel(notificationChannels.chats_silent);
  const channelId = await notifee.createChannel(notificationChannels.screenCapture);
};
