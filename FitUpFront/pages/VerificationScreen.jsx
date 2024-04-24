import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const VerificationScreen = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']); // Assuming this is for a six-digit code

  useEffect(() => {
    // Asynchronously retrieve the email from storage when the component mounts
    const retrieveEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedEmail) {
          setEmail(storedEmail);

          // Trigger the email verification process
          await fetch('/users/authenticate/sendVerificationEmail', { // Corrected API endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: storedEmail }),
          });
        }
      } catch (error) {
        console.error('Error retrieving email from AsyncStorage:', error);
      }
    };

    retrieveEmail();
  }, []);


  const handleSubmit = async () => {
    // Combine the individual code digits into a single string
    const verificationCode = code.join('');

    try {
      const response = await fetch('/users/authenticate/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });
      const data = await response.json();
      if (data.message === 'Email successfully verified') {
        // Navigate to SignUpPage1
      } else {
        // Handle the case where verification is not successful
        console.error('Verification failed:', data.message);
      }
    } catch (error) {
      // Handle the error from the fetch request
      console.error('Error submitting verification code:', error);
    }
  };

  const handleCodeInput = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleResendCode = () => {
    Alert.alert("Email Sent", "The verification code has been resent to your email.");
  };



  const handleCancel = () => {
    navigation.navigate('SignUpPage');
  };

  const renderCodeInputs = () => {
    return code.map((value, index) => (
      <TextInput
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
      <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
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