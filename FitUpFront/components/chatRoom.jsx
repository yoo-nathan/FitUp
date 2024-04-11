import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import io from "socket.io-client";
import { getFirstName } from '../service/getService';


const socket = io("http://localhost:3000");

export default function ChatRoom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const flatListRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    socket.on("chatting", (data) => {
      // setMessages((prevMessages) => [...prevMessages, data]);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, data];
        // console.log(updatedMessages); // 새로운 메시지 상태 확인
        return updatedMessages;
      });
    });

    return () => socket.off("chatting");
  }, []);

  const sendMessage = async () => {
    if (message.trim().length > 0) {
      // console.log('Finding token from storage...')
      const token = await AsyncStorage.getItem('userToken'); // UID
      // console.log("Token: " + token);
      
      const firstName = await getFirstName(token);

      socket.emit("chatting", { name: firstName, msg: message });
      setMessage('');
      setUserName(firstName);
      inputRef.current.focus();
    }
  };

  const renderItem = ({ item }) => {
    return ( 
      <>
        <View style={{ marginLeft: 10 }}>
          {item.name != userName && <Text style={styles.senderName}>{item.name}</Text>}
        </View>
        <View style={[styles.messageTimeContainer, item.name === userName ? styles.contentMyMessage : styles.contentOtherMessage]}>
          {item.name === userName && <Text>{item.time}</Text>}
          <View style={[styles.messageContainer, item.name === userName ? styles.myMessage : styles.otherMessage]}>
            <View style={[styles.messageContent, item.name === userName ? styles.contentMyMessage : styles.contentOtherMessage]}>
              <Text style={styles.messageText}>{item.msg}</Text>
            </View>
          </View>
          {item.name != userName && <Text>{item.time}</Text>}
        </View>    
      </>
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
