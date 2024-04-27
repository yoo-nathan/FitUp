import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform, Button } from 'react-native';
import io from "socket.io-client";
import { Message } from './Message';
import { getFirstName } from '../service/getService';
import { getMyID, getChatHistory } from '../service/chatService';
import { markAsRead } from '../service/chatService';

const socket = io("https://cs-370-420520.ue.r.appspot.com");

export default function ChatRoom({ route, navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiverName, setReceiverName] = useState('');
  const flatListRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [roomId, setRoomId] = useState('');

  function createRoomId(uid1, uid2) {
    const sortedUids = [uid1, uid2].sort();
  
    const newRoomId = sortedUids.join('_');
    return newRoomId;
  }

  useEffect(() => {
    const setupSocketAndFetchData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const from_id = await getMyID(token);
      const { to_id } = route.params;
  
      setFromId(from_id);
      setToId(to_id);
  
      const room_id = createRoomId(from_id, to_id);
      setRoomId(room_id);
  
      const firstName = await getFirstName(to_id);
      setReceiverName(firstName);
  
      const history = await getChatHistory(from_id, to_id);
      setMessages(history.results);

      socketRef.current = io("https://cs-370-420520.ue.r.appspot.com", { query: { token } });
      //socketRef.current = io("localhost:3000", { query: { token } });

      socketRef.current.on("messageReceived", (newMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    };
  
    const updateMessageReadStatus = (from_id) => {
      setMessages(prevMessages => prevMessages.map(msg => {
        if (msg.from_id !== from_id && msg.read_status === 1) {
          return { ...msg, read_status: 0 };
        }
        return msg;
      }));
    };
  
    setupSocketAndFetchData();
  
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off("userJoined");
        socketRef.current.off("updateReadStatus");
        socketRef.current.off("messageReceived");
      }
    };
  }, [route.params]);
  
  

  const sendMessage = async () => {
    if (message.trim().length > 0) {
      const msgData = {
        room_id: roomId,
        from_id: fromId, 
        to_id: toId, 
        message: message,
        read_status: 1
      };

      socketRef.current.emit("chatting", msgData);
      setMessage('');
      inputRef.current.focus();
    }
  };

  const renderItem = ({ item, index }) => {
    const isMyMessage = item.from_id === fromId;
    
    return (
      <View>
        <View style={{ marginLeft: 10 }}>
          {!isMyMessage && <Text style={styles.senderName}>{receiverName}</Text>}
        </View>
        <Message 
        item={item} 
        index={index}
        isMyMessage={isMyMessage}
        />
      </View>
    )
  };

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatList')}
        >
          <Text style={[{fontSize: 22, transform: [{ rotate: '180deg'}]}, styles.senderName]}>&#10132;</Text>
        </TouchableOpacity>
        
        <Text style={[{fontSize: 18, paddingLeft: 10}, styles.senderName]}>{receiverName}</Text>
      </View>
    )
  }


  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);



  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
        <Header/>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 50 }}
          inverted
          // onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.bottomContainer}>
          <TextInput
            ref={inputRef}
            style={ styles.msgBox }
            onChangeText={setMessage}
            value={message}
            placeholder="Type a message..."
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            blurOnSubmit={false}
            placeholderTextColor="gray"
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
  senderName: {
    fontWeight: 'bold',
  },
  headerContainer: {
    backgroundColor: 'white',
    width: "100%",
    height: "5%",
    justifyContent: 'left',
    paddingHorizontal: "1%",
    paddingBottom: 10,
    flexDirection: 'row'
  }
});
