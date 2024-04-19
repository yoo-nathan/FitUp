import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform, Button } from 'react-native';
import io from "socket.io-client";
import { getFirstName } from '../service/getService';
import { getMyID, getChatHistory, saveMostRecentOne } from '../service/chatService';

const socket = io("http://localhost:3000");

export default function ChatRoom({ route, navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiverName, setReceiverName] = useState('');
  const flatListRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');

  useEffect(() => {
    async function setupSocket() {
      const token = await AsyncStorage.getItem('userToken');
      const from_id = await getMyID(token);
      const { to_id } = route.params;

      setFromId(from_id);
      setToId(to_id);

      const firstName = await getFirstName(to_id);
      setReceiverName(firstName);

      const history = await getChatHistory(from_id, to_id);
      setMessages(history['results']);

      socketRef.current = io("http://localhost:3000", { query: { token } });

      socketRef.current.on("messageReceived", (newMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    }

    setupSocket();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [route.params]);

  const sendMessage = async () => {
    if (message.trim().length > 0) {
      const msgData = { from_id: fromId, to_id: toId, message };
      socketRef.current.emit("chatting", msgData);
      setMessage('');
      inputRef.current.focus();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const renderItem = ({ item, index }) => {
    const isMyMessage = item.from_id === fromId;

    const containerStyle = isMyMessage ? styles.myMessage : styles.otherMessage;
    const messageStyle = isMyMessage ? styles.contentMyMessage : styles.contentOtherMessage;
    
    return (
      <View>
        <View style={{ marginLeft: 10 }}>
          {!isMyMessage && <Text style={styles.senderName}>{receiverName}</Text>}
        </View>
        <View style={[styles.messageTimeContainer, messageStyle]}>
          {isMyMessage && <Text>{formatTime(item.timestamp)}</Text>}
          <View key={index} style={[styles.messageContainer, containerStyle]}>
            <View style={[styles.messageContent, messageStyle]}>
              <Text style={styles.messageText}>{item['message']}</Text>
            </View>
          </View>          
          {!isMyMessage && <Text>{formatTime(item.timestamp)}</Text>}
        </View>
      </View>
    )
  };


  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
        <View style={styles.bottomContainer}>
          <TextInput
            ref={inputRef}
            style={ styles.msgBox }
            onChangeText={setMessage}
            value={message}
            placeholder="Type a message"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            blurOnSubmit={false}
          />
          <TouchableOpacity style={ styles.sendButton } onPress={sendMessage} disabled={!message.trim()}>
            <Image source={require('../assets/send.png')} style={styles.buttonImage}/>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  msgBox: {
    flex: 9,
    marginRight: 10, 
    padding: 10,
  },
  sendButton: {
    flex: 1,
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
  messageContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '75%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#daf8cb',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  senderName: {
    fontWeight: 'bold',
  },
  messageContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  contentMyMessage: {
    justifyContent: 'flex-end', 
  },
  contentOtherMessage: {
    justifyContent: 'flex-start', 
  },
  messageTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
