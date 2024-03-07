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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});