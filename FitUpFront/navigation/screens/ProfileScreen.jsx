import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import { 
  View, 
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
 } from 'react-native';
import { getFirstName, getUserEmail } from '../../service/getService';
import { getMyID } from '../../service/chatService';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const uid = await getMyID(token);
      const userName = await getFirstName(uid);
      setName(userName);

      const userEmail = await getUserEmail(uid);
      setEmail(userEmail.email);
    }
    fetchInfo();
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={{alignItems:'center', justifyContent:'center', height: 250}}>
        <Image resizeMode='contain'
            style={styles.iconImg}
            source={{uri:'https://cdn2.iconfinder.com/data/icons/colored-simple-circle-volume-01/128/circle-flat-general-51851bd79-512.png'}}/>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <View style={styles.lowerView}>
        <TouchableOpacity style={styles.touchableStyle}
        onPress={() => navigation.navigate('EditProfile')}
        >
          <View style={{flexDirection: 'row'}}>
            <Image resizeMode='contain'
              style={styles.widgetImg}
              source={{uri:'https://static-00.iconduck.com/assets.00/edit-profile-icon-512x421-6kngp5gu.png'}}/>
            <Text style={styles.widgetText}> Edit Profile</Text>
          </View>
          <Text style={styles.arrowText}>&#187;</Text>
        </TouchableOpacity>
        <View style={styles.hairline}/>

        <TouchableOpacity 
        style={styles.touchableStyle}
        onPress={() => navigation.navigate('ContactUs')}
        >
          <View style={{flexDirection: 'row'}}>
            <Image resizeMode='contain'
              style={styles.widgetImg}
              source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrG5wPpOIB74fs9jyiHy19EAcyS3XLfaNgR5p5rzDWMA&s'}}/>
            <Text style={styles.widgetText}> Contact FitUp </Text>
          </View>
          <Text style={styles.arrowText}>&#187;</Text>
        </TouchableOpacity>
        <View style={styles.hairline}/>
        <TouchableOpacity 
          style={styles.touchableStyle}
          onPress={async () => {
            try {
                // console.log('Logging out');
                await AsyncStorage.removeItem('userToken');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignInPage' }],
                });
                // console.log('Logged out successfully');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }}
        
        >
          <View style={{flexDirection: 'row'}}>
            <Image resizeMode='contain'
              style={styles.widgetImg}
              source={{uri: 'https://i.pinimg.com/564x/b8/c9/9e/b8c99e1eb63169d5a862bbf90b171d28.jpg'}}/>
            <Text style={styles.widgetText}> Logout </Text>
          </View>
          <Text style={styles.arrowText}>&#187;</Text>
        </TouchableOpacity>
        <View style={styles.hairline}/>

        <TouchableOpacity 
          style={styles.touchableStyle}
          onPress={() => {console.log('implement delete')}}
        >
          <View style={{flexDirection: 'row'}}>
            <Image resizeMode='contain'
              style={styles.widgetImg}
              source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEqb7yH6GMN43ZOyS5_LiZvWutK3h5ihP1Q93v7T6qA&s'}}/>
            <Text style={styles.widgetText}> Delete Account</Text>
          </View>
          <Text style={styles.arrowText}>&#187;</Text>
        </TouchableOpacity>
        

        
        
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer : {
    flex: 1, 
    backgroundColor: '#373F51',
    
  },
  headerText :{
    color: 'white',
    fontSize: 25,
    fontWeight: '600'
  },
  emailText :{
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20
  },
  iconImg :{
    width: 75,
    height: 75, 
    //marginTop: 25,
    marginBottom: 20   
  },
  widgetImg : {
    width: 35,
    height: 35,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  lowerView : {
    height: screenHeight*0.6,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  widgetText :{
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 15,
    paddingHorizontal: 5
  },
  arrowText :{
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
    paddingRight: 25,
    paddingVertical: 10
  },
  hairline: {
    backgroundColor: 'grey',
    height: 0.5,
    width: 350,
    alignItems: 'center',
    opacity: 0.5,
    marginHorizontal: 20
  },
  touchableStyle: {
    flexDirection: 'row', 
    paddingVertical: 22, 
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
})