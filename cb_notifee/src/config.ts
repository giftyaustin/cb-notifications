import AsyncStorage from "@react-native-async-storage/async-storage";

export const socketURL = 'ws://10.10.0.82:3000/';

export const getUserId = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
        const randomUserId = Math.floor(Math.random() * 9000) + 1000;
        await AsyncStorage.setItem('userId', randomUserId.toString());
        return randomUserId;
    }
    return userId;
}