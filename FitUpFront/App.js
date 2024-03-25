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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;