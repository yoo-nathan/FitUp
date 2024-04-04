import * as React from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  Image
 } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={{alignItems:'left'}}>
      <Text style={styles.headerText}>Profile</Text>
      
      </View>
      <Image resizeMode='contain'
          style={styles.iconImg}
          source={require('../../assets/pictures/general_user.png')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer : {
    flex: 1, 
    backgroundColor: '#373F51',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText :{
    color: 'white',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'left',
    //marginHorizontal: 25,
    //paddingVertical: 15
  },
  
  iconImg :{
    width: 50,
    height: 50,    
  }
})