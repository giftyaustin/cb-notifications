import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { connectSocket } from './src/socket';
import useFCMSetup from './src/useFCMSetup';
import ChatScreen from './src/chats/ChatScreen';
import HomeScreen from './src/home/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useFCMSetup()
  React.useEffect(() => {
    const connect = async () => {   
      await connectSocket();
    };
    connect();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
