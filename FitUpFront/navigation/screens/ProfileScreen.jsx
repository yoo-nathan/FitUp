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
            source={require('../../assets/pictures/general_user.png')}/>
        <Text style={styles.headerText}>{USER.name}</Text>
        <Text style={styles.emailText}>{USER.email}</Text>
      </View>
      <View style={styles.lowerView}>
        <TouchableOpacity style={styles.touchableStyle}>
          <View style={{flexDirection: 'row'}}>
            <Image resizeMode='contain'
              style={styles.widgetImg}
              source={require('../../assets/profile/edit.png')}/>
            <Text style={styles.widgetText}> Edit Profile</Text>
          </View>
          <Text style={styles.arrowText}>&#187;</Text>
        </TouchableOpacity>
        <View style={styles.hairline}/>

        <TouchableOpacity style={styles.touchableStyle}>
          <View style={{flexDirection: 'row'}}>
            <Image resizeMode='contain'
              style={styles.widgetImg}
              source={require('../../assets/profile/invite.png')}/>
            <Text style={styles.widgetText}> Invite Friends</Text>
          </View>
          <Text style={styles.arrowText}>&#187;</Text>
        </TouchableOpacity>
        <View style={styles.hairline}/>

        <TouchableOpacity style={styles.touchableStyle}>
          <View style={{flexDirection: 'row'}}>
            <Image resizeMode='contain'
              style={styles.widgetImg}
              source={require('../../assets/profile/settings.png')}/>
            <Text style={styles.widgetText}> Settings</Text>
          </View>
          <Text style={styles.arrowText}>&#187;</Text>
        </TouchableOpacity>
        <View style={styles.hairline}/>

        <TouchableOpacity style={styles.touchableStyle}>
          <View style={{flexDirection: 'row'}}>
            <Image resizeMode='contain'
              style={styles.widgetImg}
              source={require('../../assets/profile/help.png')}/>
            <Text style={styles.widgetText}> Help </Text>
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