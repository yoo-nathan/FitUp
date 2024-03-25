import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';

const LoginPage = () => {
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
              />
            </View>
            <Text style={styles.sidetitle1}> Password </Text>
            <View style={styles.inputView}>
              <TextInput
              style={styles.inputText}
              secureTextEntry
              placeholder="Enter Password"
              placeholderTextColor="#003f5c"
              />
            </View>
            <TouchableOpacity style={styles.forgotPwPress} > 
              <Text style={styles.forgotPwText}>Forgot Password? </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={signInPress} >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            
          </View>
        </View>
        
      )
}
const signInPress = () => console.log('Implement Sign In')

const styles = StyleSheet.create({
    container: {
      flex: 4,
      backgroundColor: '#000000',
    },
    content: {
      paddingVertical: 10, 
      textAlign: 'center', 
      width: '100%',
      height: '100%',
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
<<<<<<< HEAD
        textAlign: 'left',
=======
        // alignItems: 'left',
>>>>>>> 8ff41320aa787308519c2b6e1839efb39a1b34dd
        paddingVertical: 5,
        paddingRight: 250
        },
      sidetitle1:{
          fontWeight: "normal",
          fontSize:15,
          color:"white",
<<<<<<< HEAD
          textAlign: 'left',
=======
          // alignItems: 'left',
>>>>>>> 8ff41320aa787308519c2b6e1839efb39a1b34dd
          paddingVertical: 5,
          paddingRight: 220
          },
    forgotPwPress: {
            paddingRight: 200
          },
    forgotPwText:{
      fontWeight: "normal",
<<<<<<< HEAD
      textDecorationLine: 'underline',
      fontSize:14,
      color:"grey",
      textAlign: 'left',
=======
      // textDecorationLine: 'line',
      fontSize:14,
      color:"grey",
      // alignItems: 'left',
>>>>>>> 8ff41320aa787308519c2b6e1839efb39a1b34dd
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
  
export default LoginPage; 
