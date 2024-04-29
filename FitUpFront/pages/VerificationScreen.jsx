import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendVerificationEmail } from '../service/authService';



const VerificationScreen = ({ route, navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const { email, password, realCode } = route.params;

  const handleCodeInput = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const verifyCode = () => {
    if (realCode === code.join("")) {
      navigation.navigate('SignUpPage1', { 
        email: email,
        password: password
      });
    }
  }

  const handleResendCode = () => {
    Alert.alert("Email Sent", "The verification code has been resent to your email.");
  };

  const handleCancel = () => {
    navigation.navigate('SignUpPage');
  };

  const renderCodeInputs = () => {
    return code.map((value, index) => (
      <TextInput
        key={index}
        style={styles.codeInput}
        maxLength={1}
        keyboardType="numeric"
        onChangeText={(text) => handleCodeInput(text, index)}
        value={code[index]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please enter the code</Text>
      <Text style={styles.subtitle}>
        We've sent a code to your Emory email.{'\n'}It might take a few minutes.{'\n'}Please check the junk folder if not found.
      </Text>
      <View style={styles.codeInputContainer}>
        {renderCodeInputs()}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleResendCode}>
        <Text style={styles.buttonText}>Resend the code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={verifyCode}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#373F51',
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderColor: 'white',
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4b0082',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#6a0dad',
  },
  cancelButton: {
    backgroundColor: 'grey',
  },
});

export default VerificationScreen;