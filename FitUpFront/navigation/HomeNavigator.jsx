import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FilterPage from '../pages/FilterPage';
const Stack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeList" >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Filter" component={FilterPage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default HomeNavigator;