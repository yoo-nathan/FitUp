import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ThankYou = ({ navigation }) => {  

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MainContainer'); 
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Thank you for joining FitUp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373F51', 
    justifyContent: 'center',
    textAlign: 'center', 
  },
  message: {
    fontWeight: '700',
    fontSize: 35,
    lineHeight: 52.5,
    letterSpacing: -0.01,
    color: 'white',
    textAlign: 'center',
  },
});

export default ThankYou;