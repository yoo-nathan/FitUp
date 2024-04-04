import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

const ForgotPasswordPage = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = () => {
        // Implement password reset logic here
        // Make an API call to send a password reset link to the provided email
        Alert.alert("Reset Link Sent", "Please check your email for the password reset link.", [{ text: "OK", onPress: () => navigation.goBack() }]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
                <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('LogInPage')}>
                <Text style={styles.backButtonText}>Back to Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#373F51', 
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
    input: {
      width: '100%', 
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
      color: '#333', 
    },
    button: {
      width: '100%',
      backgroundColor: '#4b0082', 
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    backButton: {
      marginTop: 20,
    },
    backButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      textDecorationLine: 'underline',
    },
  });

export default ForgotPasswordPage;
