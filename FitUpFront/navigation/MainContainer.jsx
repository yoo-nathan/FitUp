import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import HomeNavigator from './HomeNavigator';
import ChatNavigator from './ChatNavigator';
import MenuScreen from './screens/MenuScreen';
import ProfileScreen from './screens/ProfileScreen';

const MainContainer = ({route}) => {
  // Screen names
  const homeName = 'Home';
  const chatName = 'Chat';
  const menuName = 'Menu';
  const profileName = 'Profile'

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={
      ({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === chatName) {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (rn === menuName) {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color}/>;
        },
      })}
      >
      <Tab.Screen name={homeName} component={HomeNavigator}/>
      <Tab.Screen name={chatName} component={ChatNavigator} />
      <Tab.Screen name={menuName} component={MenuScreen}/>
      <Tab.Screen name={profileName} component={ProfileScreen}/>
    </Tab.Navigator>
  );
}

export default MainContainer; 