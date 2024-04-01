import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// page or screen
import ProfileInfoScreen from './pages/ProfileInfoScreen'; 
import SignInPage from './pages/SignInPage';
import MainContainer from './navigation/MainContainer';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        //AsyncStorage.removeItem('userToken'); // line added for live demo in class. don't forget to remove later.
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    // TODO: create a splash screen
    return ; 
  }

  return (
    // change userToken to !userToken to see MainContainer
    <>
    { userToken ? <MainContainer/> : <SignInPage/> }
    </>
    // <MainContainer/>
    // <NavigationContainer>
    //   { userToken ? (
    //       <MainContainer/>
    //     ) : (
    //       <Stack.Navigator>
    //         <Stack.Screen name="SignIn" component={SignInPage} />
    //       </Stack.Navigator>
    //     )
    //   }
    // </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff', 
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App;