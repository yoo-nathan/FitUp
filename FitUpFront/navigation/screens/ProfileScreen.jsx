import * as React from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
 } from 'react-native';

////<Text style={styles.headerText}>Profile</Text>

const USER = {
  name: "John Doe",
  email: "j.doe@emory.edu"
};

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={{alignItems:'center', justifyContent:'center', height: 250}}>
        <Image resizeMode='contain'
            style={styles.iconImg}
            source={{uri:'https://cdn2.iconfinder.com/data/icons/colored-simple-circle-volume-01/128/circle-flat-general-51851bd79-512.png'}}/>
        <Text style={styles.headerText}>{USER.name}</Text>
        <Text style={styles.emailText}>{USER.email}</Text>
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
        <TouchableOpacity style={styles.touchableStyle}>
          <View style={{flexDirection: 'row'}}>
            <Image resizeMode='contain'
              style={styles.widgetImg}
              source={{uri: 'https://cdn0.iconfinder.com/data/icons/basic-ui-75/24/Invite_Friends-512.png'}}/>
            <Text style={styles.widgetText}> Invite Friends</Text>
          </View>
          <Text style={styles.arrowText}>&#187;</Text>
        </TouchableOpacity>
        <View style={styles.hairline}/>

        <TouchableOpacity style={styles.touchableStyle}>
          <View style={{flexDirection: 'row'}}>
            <Image resizeMode='contain'
              style={styles.widgetImg}
              source={{uri:'https://static-00.iconduck.com/assets.00/settings-icon-2048x2046-cw28eevx.png'}}/>
            <Text style={styles.widgetText}> Settings</Text>
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
    height: 500,
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
  }
})