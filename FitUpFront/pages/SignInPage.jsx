import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from './../service/authService';
import { useNavigation } from '@react-navigation/native';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigation = useNavigation();

    const signInPress = async () => {
      try {
        const tokenData = await login(email, password);
        
        if (tokenData) {
          await AsyncStorage.setItem('userToken', tokenData.token);
          Alert.alert("Success", "Successfully logged in!");
          navigation.navigate('MainContainer');
          // setIsLoggedIn(true);
        } else {
          Alert.alert("Login Failed", "Invalid email or password");
        }

      } catch (error) {
          console.error(error);
          const errorMessage = error.token ? error.token.data.message : "An error occurred!";
          Alert.alert("Error", errorMessage);
      }
    }

    const handleCreateAcc = () => {
      navigation.navigate('SignUpPage');
    }

    const handleForgotPw = () => {
      navigation.navigate('ForgotPasswordPage');
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
              onChangeText={text => setEmail(text)}
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
              onChangeText={text => setPassword(text)}
              value={password}
              />
            </View>
            <TouchableOpacity 
            style={styles.forgotPwPress}
            onPress={handleForgotPw} > 
              <Text style={styles.forgotPwText}>Forgot Password? </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button} 
            onPress={signInPress} >
              <Text 
              style={styles.buttonText}
              >Sign In</Text>
            </TouchableOpacity>
            
            <View style={styles.createAccContainer}>
              <Text style={{fontSize: 14}}>New to FitUp? </Text>
              <TouchableOpacity onPress={handleCreateAcc} > 
                <Text style={styles.creatAcc}>Create an account </Text>
              </TouchableOpacity>
            </View>
            
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
<<<<<<< Updated upstream
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
      createAccContainer : {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row'
      },
      creatAcc : {
        color: 'white',
        fontSize: 14,
        textDecorationLine: 'underline',
        textAlign: 'center'
      }
=======
  inputText:{
    height:50,
    color:"white",
    opacity: 0.7
    },
  button: {
    backgroundColor: '#8075FF', 
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
  createAccContainer : {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row'
  },
  creatAcc : {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
  
>>>>>>> Stashed changes
  });
  
export default SignInPage; 
