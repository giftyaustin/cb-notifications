import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { getUserId } from '../config';

export default function ChatScreen({ route }: any) {
  const { receiverId } = route.params ?? {};
  const [userId, setUserId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const id = await getUserId();
      setUserId(id);
    })();
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    console.log(`Sending message from ${userId} to ${receiverId}:`, message);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Logged in as: {userId ?? 'loading...'}</Text>
      <Text style={styles.subtitle}>Chatting with: {receiverId ?? 'unknown'}</Text>

      <View style={styles.placeholder}>
        <Text>No messages yet</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={message}
            onChangeText={setMessage}
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
    height: 40,
  },
});
