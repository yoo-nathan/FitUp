import * as React from 'react';
import { View, Text } from 'react-native';
import ChatRoom from '../../components/chatRoom';

export default function ChatScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <Text
        onPress={() => navigation.navigate('Home')}
        style={{ fontSize: 26, fontWeight: 'bold' }}>
        Go to Home Screen
      </Text> */}
      <ChatRoom></ChatRoom>
    </View>
  );
}
