import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Alert} from 'react-native';
import { getUserId } from '../config';

type Props = {
  navigation: any;
};

export default function HomeScreen({navigation}: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string>("");

  useEffect(() => {
    const loadUser = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    loadUser();
  }, []);

  if (!userId) return null;

  const handleChat = () => {
    if (!receiverId.trim()) {
      Alert.alert("Error", "Please enter a receiver userId");
      return;
    }
    navigation.navigate("Chat", {receiverId});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        {userId ? `User: ${userId}` : 'Loading...'}
      </Text>

      <TextInput
        placeholder="Enter receiver userId"
        value={receiverId}
        onChangeText={setReceiverId}
        style={styles.input}
      />

      <View style={{marginTop: 16, width: "80%"}}>
        <Button title="Chat" onPress={handleChat} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16},
  title: {fontSize: 28, fontWeight: '700', marginBottom: 8},
  subtitle: {fontSize: 16, color: '#444', marginBottom: 16},
  input: {
    width: "80%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
