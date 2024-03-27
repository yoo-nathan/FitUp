import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens
import HomeScreen from './screens/HomeScreen';
// import ChatScreen from './screens/ChatScreen';
import ChatRoom from '../components/chatRoom';
import NetworkScreen from './screens/NetworkScreen';
import MenuScreen from './screens/MenuScreen';
import ProfileScreen from './screens/ProfileScreen';

// Screen names
const homeName = 'Home';
const chatName = 'Chat';
const networkName = 'Network';
const menuName = 'Menu';
const profileName = 'Profile'

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === chatName) {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (rn === networkName) {
              iconName = focused ? 'people' : 'people-outline';
            } else if (rn === menuName) {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color}/>;
          },
        })}
        >
        <Tab.Screen name={homeName} component={HomeScreen}/>
        <Tab.Screen name={chatName} component={ChatRoom}/>
        <Tab.Screen name={networkName} component={NetworkScreen}/>
        <Tab.Screen name={menuName} component={MenuScreen}/>
        <Tab.Screen name={profileName} component={ProfileScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}