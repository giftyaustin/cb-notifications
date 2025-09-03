import notifee, { AndroidStyle } from '@notifee/react-native';
import { notificationChannels } from './createNotificationChannels';
import { Message } from '../chats/ChatScreen';

export const displayIncomingCallNotification = async (callerName: string) => {
  await notifee.displayNotification({
    title: `${callerName} is calling...`,
    body: 'Tap to answer or reject',
    android: {
      channelId: notificationChannels.calls.id,
      sound: 'default',
      pressAction: { id: 'default' },
      actions: [
        {
          title:
            '<p style="background-color: red; color: white; border-radius: 8px; padding: 8px 12px; display: inline-block;"> answer </p>',
          pressAction: {
            id: 'answer',
            launchActivity: 'default',
            mainComponent: "Home",
          },
        },
        { title: 'Reject', pressAction: { id: 'reject' } },
      ],
      style: {
        type: AndroidStyle.BIGTEXT,
        text: 'You have an incoming call',
      },
    },
  });
};

export class Notify {
  static async displayIncomingCallNotification(callerName: string) {
    await notifee.displayNotification({
      title: `${callerName} is calling...`,
      body: 'Tap to answer or reject',
      android: {
        channelId: notificationChannels.calls.id,
        sound: 'default',
        pressAction: { id: 'default' },
        actions: [
          {
            title: 'Answer',
            pressAction: {
              id: 'answer',
              launchActivity: 'default',
              mainComponent: "Home",
            },
          },
          { title: 'Reject', pressAction: { id: 'reject' } },
        ],
        style: {
          type: AndroidStyle.BIGTEXT,
          text: 'You have an incoming call',
        },
      },
    });
  }

  static async incomingMessage(
    message: Message,
    // conversationData: IConversation,
    soundEnabled: boolean = true,
  ) {
    const channelId = soundEnabled
      ? notificationChannels.chats.id
      : notificationChannels.chats_silent.id;
    console.log('Notification channel ID:', channelId);

    await notifee.displayNotification({
      id: message.id,
      title: "Message",
      body: message.text,
      data: { openScreen: "Home" },
      android: {
        channelId: channelId,
        pressAction: { id: 'message', mainComponent: "Home" },
        color: "#6200EE",
        // smallIcon: 'cb_notification',
        style: {
          type: AndroidStyle.MESSAGING,
          person: { name: message.senderId },
          messages: [
            {
              text: message.text || 'Mock message',
              timestamp: Date.now(),
              person: { name: message.senderId },
            },
          ],
        },
        actions: [
          {
            title: 'Reply',
            pressAction: {
              id: 'reply',
              launchActivity: 'default',
              mainComponent: "Home",
            },
          },
        ],
      },
    });
  }
}
