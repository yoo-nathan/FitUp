import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import io from "socket.io-client";
import { countUnRead, getChatList, getMyID, isReadMsg } from '../../service/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirstName } from '../../service/getService';
import moment from 'moment-timezone';

const convertUtcToEst = (utcDate) => {
  return moment(utcDate).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

const FriendItem = ({ DATA, onPress }) => (
  // console.log(DATA)
  <TouchableOpacity onPress={() => onPress(DATA.uid, DATA.name)}>
    <View style={styles.profileView}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/pictures/general_user.png')}
          style={styles.profileImg}
        />
<<<<<<< HEAD
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.profileText}>{DATA.name}</Text>
          <Text>{DATA.message}</Text>
          <Text>{formatTime(convertUtcToEst(DATA.time))}</Text>
        </View>
        <View>
          {DATA.unread_count > 0 && <Text>{DATA.unread_count}</Text>}
=======
        <View style={{ flexDirection: 'column', width : screenWidth * 0.7 , marginVertical: 3}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.profileText}>{DATA.name}</Text>
            <Text style={{paddingVertical: 10, fontWeight: '500'}}>{formatTime(DATA.time)}</Text>
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 20, color:'grey'}}>{DATA.message}</Text>
>>>>>>> ab16acbdb0f972c8d503c70bcb1a2e36bd8a92f8
        </View>

      </View>
    </View>
  </TouchableOpacity>
);

export default function ChatScreen({ navigation }) {
  // const [userId, setUserId] = useState('');
  const [chatData, setChatData] = useState([]);
  const socketRef = useRef(null);
  // const [token, setToken] = useState(null);
  const isMounted = useRef(false);
  const [activeChatId, setActiveChatId] = useState(null);


  // useEffect(() => {
  //   isMounted.current = true; 
  //   const loadChatList = async () => {
  //     try {
  //       const userToken = await AsyncStorage.getItem('userToken');
  //       if (userToken && isMounted.current) {
  //         // setToken(userToken);
  //         const from_id = await getMyID(userToken);
  //         if (from_id && isMounted.current) {
  //           // setUserId(from_id);
  //           socketRef.current = io("wss://cs-370-420520.ue.r.appspot.com", { query: { token: userToken } });

  //           const chatList = await getChatList(from_id);
            
  //           const list = chatList.map((element, index) => ({
  //               uid: element.partner_id,
  //               name: element.partner_name,
  //               message: element.chat_details.last_message,
  //               time: element.chat_details.last_message_time,
  //               // read_status: element.read_status
  //           }));

  //           if (isMounted.current) setChatData(list);

  //           // socketRef.current.off("messageReceived");
  //           socketRef.current.on("messageReceived", (newMessage) => {
  //             updateChatList(newMessage);
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error loading chat list:', error);
  //     }
  //   };

  //   loadChatList();

  //   return () => {
  //     isMounted.current = false;
  //     socketRef.current?.disconnect();
  //   };
  // }, []);

  // const updateChatList = async (newMessage) => {
  //   try {
  //     const token = await AsyncStorage.getItem('userToken');
  //     const fromId = await getMyID(token);
  //     const uid = newMessage.from_id != fromId ? newMessage.from_id : newMessage.to_id;
  //     const name = await getFirstName(uid);
  
  //     setChatData(currentData => {
  //       const existingIndex = currentData.findIndex(chat => chat.uid === uid);
  
  //       if (existingIndex !== -1) {
  //         const updatedData = [...currentData];
  //         updatedData.splice(existingIndex, 1);
  //         const updatedChat = {
  //           uid: uid,
  //           name: name,
  //           message: newMessage.message,
  //           time: newMessage.timestamp,
  //           // read_status: newMessage.read_status
  //         };
  //         return [updatedChat, ...updatedData];
  //       } else {
  //         return [
  //           {
  //             uid: uid,
  //             name: name || 'Unknown',
  //             message: newMessage.message,
  //             time: newMessage.timestamp,
  //             // read_status: newMessage.read_status
  //           },
  //           ...currentData
  //         ];
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error updating chat list:', error);
  //     Alert.alert("Update Error", "Failed to update chat data");
  //   }
  // };
  
  useEffect(() => {
    isMounted.current = true;
    const loadChatList = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken && isMounted.current) {
          const from_id = await getMyID(userToken);
          if (from_id && isMounted.current) {
            socketRef.current = io("wss://cs-370-420520.ue.r.appspot.com", { query: { token: userToken } });
  
            const chatList = await getChatList(from_id);
            
            const list = chatList.map((element) => ({
                uid: element.partner_id,
                name: element.partner_name,
                message: element.chat_details.last_message,
                time: element.chat_details.last_message_time,
                unread_count: element.chat_details.unread_count || 0
            }));
  
            if (isMounted.current) setChatData(list);
<<<<<<< HEAD

            //socketRef.current = io("https://cs-370-420520.ue.r.appspot.com", { query: { token: userToken } });
            socketRef.current = io("localhost:3000", { query: { token: userToken } });

            socketRef.current.off("messageReceived");
=======
  
>>>>>>> origin/main
            socketRef.current.on("messageReceived", (newMessage) => {
              updateChatList(newMessage);
            });
          }
        }
      } catch (error) {
        console.error('Error loading chat list:', error);
      }
    };
  
    loadChatList();
  
    return () => {
      isMounted.current = false;
      socketRef.current?.disconnect();
    };
  }, []);

  const updateChatList = (newMessage) => {
    try {
      const token = AsyncStorage.getItem('userToken').then(async (token) => {
        const fromId = await getMyID(token);
        const uid = newMessage.from_id !== fromId ? newMessage.from_id : newMessage.to_id;
  
        setChatData(currentData => {
          const existingIndex = currentData.findIndex(chat => chat.uid === uid);
          const existingChat = currentData[existingIndex];
          const unreadCount = existingChat && newMessage.from_id !== fromId && uid !== activeChatId
                              ? existingChat.unread_count + 1
                              : existingChat?.unread_count;
    
          const updatedChat = {
            uid: uid,
            name: existingChat?.name || 'Loading...',
            message: newMessage.message,
            time: newMessage.timestamp,
            unread_count: unreadCount || 0
          };
    
          if (existingIndex !== -1) {
            const updatedData = [...currentData];
            updatedData.splice(existingIndex, 1);
            return [updatedChat, ...updatedData];
          } else {
            return [updatedChat, ...currentData];
          }
        });
      });
    } catch (error) {
      console.error('Error updating chat list:', error);
      Alert.alert("Update Error", "Failed to update chat data");
    }
  };
  
  

  // const goToChatRoom = (uid, name) => {
  //   navigation.navigate('ChatRoom', { to_id: uid, userName: name })
  // }

  const markMessagesAsRead = (chatId) => {
    setActiveChatId(chatId); // Set the active chat ID when chat is opened
    setChatData(currentData => {
      return currentData.map(chat => {
        if (chat.uid === chatId) {
          return { ...chat, unread_count: 0 }; // Reset unread count
        }
        return chat;
      });
    });
  };
  
  const goToChatRoom = (uid, name) => {
    markMessagesAsRead(uid); // Mark messages as read when chat room is opened
    navigation.navigate('ChatRoom', { to_id: uid, userName: name });
  };
  

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={chatData}
        renderItem={({ item }) => <FriendItem DATA={item} onPress={goToChatRoom} />}
        keyExtractor={item => item.uid.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer : {
    flex: 1, 
    backgroundColor: 'white',
    
  },
  headerText :{
    color: 'black',
    fontSize: 22,
    fontWeight: '600',
    paddingVertical:10
  },
  headerView :{
    justifyContent:'space-between', 
    flexDirection:'row',
    marginVertical: 10,
    marginHorizontal: 10
  },
  iconImg : {
    width: 25,
    height: 25,
    marginHorizontal: 10,
    marginVertical: 10,
    
  },
  inputText: {
    width: '80%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    borderColor: 'lightgrey',
    borderWidth: 2,
    alignSelf: 'center',
    paddingVertical: 15
    
},
  profileView : {
    flexDirection:'row',
    height: 85,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'lightgrey',
    borderWidth: 1
  },
  profileImg : {
    width: screenWidth * 0.14,
    height: 55,
    marginHorizontal: screenWidth * 0.05,
    marginVertical: 10,
    
  },
  msgImg : {
    width: 45,
    height: 45,
    marginHorizontal: 20,
    marginVertical: 10,
    
  },
  profileText :{
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    paddingVertical:5
  },
  profileSubText :{
    color: 'black',
    fontSize: 12,
    fontWeight: '400',
    paddingVertical:5
  },
  widgetText :{
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 15,
    paddingHorizontal: 5
  },
  arrowText :{
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
    paddingRight: 25,
    paddingVertical: 10
  },
  hairline: {
    backgroundColor: 'grey',
    height: 0.5,
    width: 350,
    alignItems: 'center',
    opacity: 0.5,
    marginHorizontal: 20
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: "green",
    marginRight: 5,
    marginVertical: 8
  },
})
