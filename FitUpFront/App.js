import React, {useState, useEffect} from 'react';
<<<<<<< Updated upstream
import { StyleSheet, View } from 'react-native';
=======
>>>>>>> Stashed changes
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// page or screen
import ProfileInfoScreen from './pages/ProfileInfoScreen'; 
import SignInPage from './pages/SignInPage';
import MainContainer from './navigation/MainContainer';
// import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import SignUpPage1 from './pages/SignUpPage1';
import SignUpPage2 from './pages/SignUpPage2';
import WorkoutPreferences from './pages/WorkoutPreferences';
import ThankYouScreen from './pages/ThankYou';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomeScreen from './navigation/screens/HomeScreen';
import FilterPage from './pages/FilterPage';
import EditProfile from './pages/EditProfile';
import ContactUsPage from './pages/ContactUs';
import VerificationScreen from './pages/VerificationScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const checkToken = async () => {
        try {
          // AsyncStorage.removeItem('userToken'); // line added for live demo in class. don't forget to remove later.
          const token = await AsyncStorage.getItem('userToken');
          setUserToken(token);
          setIsLoading(false);
        } catch (e) {
          AsyncStorage.removeItem('userToken');
          console.error(e);
        }
      };
      checkToken();    
  }, []);

  if (isLoading) {
    // TODO: create a splash screen
    return null; 
  }

  return (
<<<<<<< Updated upstream
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName={userToken ? "MainContainer" : "SignInPage"}
=======
    // change userToken to !userToken to see MainContainer
    // <>
    //   { userToken ? <MainContainer/> : <SignInPage/> }
    // </>
    // <MainContainer/>
    // console.log(userToken)
    <NavigationContainer
    screenOptions={{
      headerShown: false,
    }}
    >
      {/* 
      { userToken ? (
        // console.log('hello')
        <MainContainer />
      ) : (
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="SignIn" component={SignInPage} />
        </Stack.Navigator>
      )}
      */}
      <Stack.Navigator 
      initialRouteName="MainContainer"
>>>>>>> Stashed changes
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="SignInPage" component={SignInPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="SignUpPage1" component={SignUpPage1} />
        <Stack.Screen name="SignUpPage2" component={SignUpPage2} />
        <Stack.Screen name="WorkoutPreferences" component={WorkoutPreferences} />
        <Stack.Screen name="ThankYou" component={ThankYouScreen} />
        <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
        <Stack.Screen name="MainContainer" component={MainContainer}/>
        <Stack.Screen name="Filter" component={FilterPage}/>
<<<<<<< Updated upstream
        {/* <Stack.Screen name="ChatRoom" component={ChatRoom}/> */}
      </Stack.Navigator>
=======
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="ContactUs" component={ContactUsPage}/>
      </Stack.Navigator> 
>>>>>>> Stashed changes
    </NavigationContainer>
  );
};


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});