import React from 'react';
import { StyleSheet, View } from 'react-native';
// Remove the import statement for LoginPage if it's not being used
// import LoginPage from './pages/LogInPage'; (Remove this line if not needed)
import VerificationScreen from './pages/VerificationScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <VerificationScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Change this to match your theme if necessary
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;