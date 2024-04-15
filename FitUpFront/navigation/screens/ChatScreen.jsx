import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import io from "socket.io-client";
import { getChatList, getMyID } from '../../service/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirstName } from '../../service/getService';


const FriendItem = ({ DATA, onPress }) => (
  <TouchableOpacity onPress={() => onPress(DATA.uid, DATA.name)}>
    <View style={styles.profileView}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/pictures/general_user.png')}
          style={styles.profileImg}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.profileText}>{DATA.name}</Text>
          <Text>{DATA.message}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function ChatScreen({ navigation }) {
  const [userId, setUserId] = useState('');
  const [chatData, setChatData] = useState([]);
  const socketRef = useRef(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadChatList = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      setToken(userToken);
      const from_id = await getMyID(userToken);
      setUserId(from_id);

      const chatList = await getChatList(from_id);
      const list = chatList['chat_result'].map((element, index) => ({
        uid: element['partner_id'],
        name: chatList['partner_name'][index],
        message: element['last_message'],
        time: element['last_message_time']
      }));

      setChatData(list);

      socketRef.current = io("http://localhost:3000", { query: { token } });

      socketRef.current.on("messageReceived", (newMessage) => {
        updateChatList(newMessage);
      });
    };

    loadChatList();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const updateChatList = async (newMessage) => {
    const uid = newMessage.from_id === userId ? newMessage.to_id : newMessage.from_id;
    const name = await getFirstName(uid);
    
    setChatData(currentData => {
      const index = currentData.findIndex(chat =>
        chat.uid === uid
      );
  
      if (index !== -1) {
        return currentData.map((chat, idx) => idx === index ? {
          ...chat,
          message: newMessage.message,
          time: newMessage.timestamp
        } : chat);
      } else {
        return [
          ...currentData,
          {
            uid: uid,
            name: name,
            message: newMessage.message,
            time: newMessage.timestamp
          }
        ];
      }
    });
  };
  

  const goToChatRoom = (uid, name) => {
    navigation.navigate('ChatRoom', { to_id: uid, userName: name })
  }

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
    width: 55,
    height: 55,
    marginHorizontal: 20,
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
