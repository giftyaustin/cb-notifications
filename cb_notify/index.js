/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

messaging().onMessage(async event => {
  console.log(
    '[Notif-Log] Foreground service triggered with notification:',
    event,
  );
});

AppRegistry.registerComponent(appName, () => App);
