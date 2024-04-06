//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { LoginPage } from './pages/SignInPage'

const App = () => {
  return (
    <View>
      <LoginPage/>
    </View>
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

// yo