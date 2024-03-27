import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from './../service/authService';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInPress = async () => {
      try {
        console.log(1)
        const tokenData = await login(email, password);
        console.log(email)
        console.log(2)
        console.log(tokenData)
        if (tokenData) {
          await AsyncStorage.setItem('userToken', tokenData);
          Alert.alert("Success", "Successfully logged in!");
        } else {
          Alert.alert("Login Failed", "Invalid email or password");
        }

      } catch (error) {
          console.error(error);
          const errorMessage = error.token ? error.token.data.message : "An error occurred!";
          Alert.alert("Error", errorMessage);
      }
    }


    return (
        <View style={{backgroundColor: '#373F51'}}>
          <View style = {styles.content}>
            <Text style={styles.title}> Welcome to FitUP!</Text>
            <Text style={styles.subtitle}> Log in with your Emory Email </Text>
            <Text style={styles.sidetitle}> Email </Text>
            <View style={styles.inputView}>
              <TextInput
              style={styles.inputText}
              placeholder="example@emory.edu"
              placeholderTextColor="#003f5c"
              onChange={setEmail} // Use the text argument to update email
              value={email}
              />
            </View>
            <Text style={styles.sidetitle1}> Password </Text>
            <View style={styles.inputView}>
              <TextInput
              style={styles.inputText}
              secureTextEntry
              placeholder="Enter Password"
              placeholderTextColor="#003f5c"
              onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.forgotPwPress} > 
              <Text style={styles.forgotPwText}>Forgot Password? </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button} 
            onPress={signInPress} >
              <Text 
              style={styles.buttonText}
              >Sign In</Text>
            </TouchableOpacity>
            
          </View>
        </View>
        
      )
}

const styles = StyleSheet.create({
    content: {
      paddingVertical: 10, 
      textAlign: 'center', 
      width: '100%',
      height: '100%',
      alignItems: 'center'
    },
    title:{
      marginTop: 130,
      fontWeight: "bold",
      fontSize:30,
      color:"white",
      textAlign: 'center',
      justifyContent: 'center',
      },
    subtitle:{
      fontWeight: "normal",
      fontSize:15,
      color:"white",
      textAlign: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      },
    sidetitle:{
        fontWeight: "normal",
        fontSize:15,
        color:"white",
        textAlign: 'left',
        paddingVertical: 5,
        paddingRight: 250
        },
      sidetitle1:{
          fontWeight: "normal",
          fontSize:15,
          color:"white",
          textAlign: 'left',
          paddingVertical: 5,
          paddingRight: 220
          },
    forgotPwPress: {
            paddingRight: 170
          },
    forgotPwText:{
      fontWeight: "normal",
      textDecorationLine: 'underline',
      fontSize:14,
      color:"grey",
      textAlign: 'left',
      paddingVertical: 0,
      },
    inputView:{
        width:"80%",
        backgroundColor:"#d3d3d3",
        borderRadius:15,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
        },
    inputText:{
      height:50,
      color:"white",
      opacity: 0.7
      },
    signInButton:{
      width:"80%",
      backgroundColor:"#4b0082",
      borderRadius:15,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
      },
      button: {
        backgroundColor: '#4b0082', 
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        width :"80%",
        marginTop:50,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
      },
  
  });
  
export default SignInPage; 
