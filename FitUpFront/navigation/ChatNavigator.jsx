import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './screens/ChatScreen';
import ChatRoom from '../components/chatRoom';
const Stack = createNativeStackNavigator();

function ChatNavigator() {
  return (
    <Stack.Navigator initialRouteName="ChatList" >
      <Stack.Screen name="ChatList" component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default ChatNavigator;