import AsyncStorage from "@react-native-async-storage/async-storage";

export const socketURL = 'ws://localhost:3000/';


export const getUserId = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
        const randomUserId = Math.random().toString(36).substring(2, 15);
        await AsyncStorage.setItem('userId', randomUserId);
        return randomUserId;
    }
    return userId;
}