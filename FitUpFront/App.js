import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// page or screen
import SignInPage from './pages/SignInPage';
import MainContainer from './navigation/MainContainer';
import SignUpPage from './pages/SignUpPage';
import SignUpPage1 from './pages/SignUpPage1';
import SignUpPage2 from './pages/SignUpPage2';
import WorkoutPreferences from './pages/WorkoutPreferences';
import ThankYouScreen from './pages/ThankYou';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerificationScreen from './pages/VerificationScreen';
import EditProfile from './pages/EditProfile';
import ContactUsPage from './pages/ContactUs';


const Stack = createNativeStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const checkToken = async () => {
        try {
          // await AsyncStorage.removeItem('userToken'); 
          const token = await AsyncStorage.getItem('userToken');
          setUserToken(token);
          setIsLoading(false);
        } catch (e) {
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
      <NavigationContainer>
        
        <Stack.Navigator 
        //initialRouteName={userToken ? "MainContainer" : "SignInPage"}
        initialRouteName='SignUpPage'
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
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
          <Stack.Screen name="MainContainer" component={MainContainer}/>
          <Stack.Screen name="EditProfile" component={EditProfile}/>
          <Stack.Screen name="ContactUs" component={ContactUsPage}/>
        </Stack.Navigator>
      </NavigationContainer>      
  );
};


export default App;