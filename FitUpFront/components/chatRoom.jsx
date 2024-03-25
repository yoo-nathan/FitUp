// import * as React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';

// const windowDimensions = Dimensions.get('window');
// const screenDimensions = Dimensions.get('screen');

// export default function ChatRoom() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.imgContainer}>
//         <Text>image</Text>
//       </View>

//       <View style={styles.content}>
//         <Text style={styles.userName}>Name</Text>
//         <Text style={styles.preview}>This is placeholder for the preview of the chat</Text>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     width: screenDimensions.width,
//     height: screenDimensions.height * 0.12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#D9D9D9',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 20,
//     paddingRight: 10
//   },
//   imgContainer: {
//     width: '14%',
//     height: '14%',
//     minWidth: 56,
//     minHeight: 56,
//     borderRadius: 56/2,
//     borderWidth: 1,
//     // flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 15
//   },
//   content: {
//     width: screenDimensions.width * 0.66,
//     height: screenDimensions.height * 0.12,
//     flex: 1,
//     justifyContent: 'space-between',
//     paddingTop: 20,
//     paddingBottom: 20
//   }, 
//   userName : {
//     fontSize: 15, 
//     fontWeight: 'bold'
//   },
//   preview: {
//     fontSize: 10,
//   }

// })

import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import io from "socket.io-client";

const socket = io("http://localhost:5001");

export default function ChatRoom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    socket.on("chatting", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => socket.off("chatting");
  }, []);

  const sendMessage = () => {
    if (message.trim().length > 0) {
      socket.emit("chatting", { name: "User Name", msg: message });
      setMessage('');
      inputRef.current.focus();
    }
  };

  const renderItem = ({ item }) => (
    <>
      <View style={{ marginLeft: 10 }}>
        {item.name != "User Name" && <Text style={styles.senderName}>{item.name}</Text>}
      </View>
      <View style={[styles.messageTimeContainer, item.name === "User Name" ? styles.contentMyMessage : styles.contentOtherMessage]}>
        {item.name === "User Name" && <Text>{item.time}</Text>}
        <View style={[styles.messageContainer, item.name === "User Name" ? styles.myMessage : styles.otherMessage]}>
          <View style={[styles.messageContent, item.name === "User Name" ? styles.contentMyMessage : styles.contentOtherMessage]}>
            <Text style={styles.messageText}>{item.msg}</Text>
          </View>
        </View>
        {item.name != "User Name" && <Text>{item.time}</Text>}
      </View>    
    </>
  );

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
