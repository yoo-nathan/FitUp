import * as React from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
 } from 'react-native';

 const ContactUsPage = ({navigation}) => {
    return (
        <View style={styles.container}>  
            <View style={styles.container}>
                <Text style={styles.header}>Contact Us!</Text>
                <Text style={styles.subtext}>Need Help or Want to Learn More?</Text>
                <Text style={styles.smalltext}>Email Us: <Text style={{ textDecorationLine: 'underline' }}>emoryfitup@gmail.com</Text></Text>
                <Image resizeMode='contain'
                style={styles.widgetImg}
                source={{uri: 'https://www.freeiconspng.com/thumbs/gmail-icon/gmail-logo-icon-4.png'}}
                />
            
            </View>  
            
            <TouchableOpacity
                style={styles.button} 
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            
            
        </View>
    )
 }

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#373F51', 
      justifyContent: 'center',
      alignContent:'center',
      alignItems: 'center',
    },
    button :{
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        height: 40,
        width: 120,
        marginHorizontal: 10,
        marginBottom: 40
      },
    buttonText:{
        fontSize: 14,
        fontWeight: '700'
    },
    upperContainer: {
        height: 200,
        flex:1
    },
    header: {
        fontSize: 46,
        fontWeight: 'bold',
        color: 'white', 
        textAlign: 'center',
        
    },
    subtext :{
        fontSize: 20,
        fontWeight: '600',
        color: 'white', 
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },
    smalltext :{
        fontSize: 16,
        fontWeight: '600',
        color: 'white', 
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: 7
    },
    widgetImg : {
        width: 80,
        height: 80,
        marginHorizontal: 10,
        marginVertical: 20,
        
    },
})

 export default ContactUsPage;