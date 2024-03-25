<<<<<<< HEAD
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileInfoScreen from './pages/ProfileInfoScreen'; 

const App = () => {
  return (
    <View style={styles.container}>
      <ProfileInfoScreen />
    </View>
  );
};
=======
//import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { LoginPage } from './pages/SignInPage';
import MainContainer from './navigation/MainContainer';

const App = () => {
  return (
    // <View>
      <MainContainer/>
    // </View>
  )
}
export default App;
>>>>>>> 8ff41320aa787308519c2b6e1839efb39a1b34dd

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;