import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const VerificationScreen = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleCodeInput = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const renderCodeInputs = () => {
    return code.map((value, index) => (
      <TextInput
        key={index}
        style={styles.codeInput}
        maxLength={1}
        keyboardType="number-pad"
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Resend the code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.submitButton]}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cancelButton]}>
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
    backgroundColor: 'black', // Change as per your theme
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
    backgroundColor: '#6a0dad', // Adjust your button colors accordingly
  },
  cancelButton: {
    backgroundColor: 'grey', // Adjust your button colors accordingly
  },
});

export default VerificationScreen;
