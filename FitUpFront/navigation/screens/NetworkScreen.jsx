import React, {useState} from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';


const test = {
  name: 'Ally',
  image: require('../../assets/pictures/general_user.png'),
  activity: 'Active'
};
const FRIENDS = [
  {
    uid: '1',
    name: 'Ally',
    image: require('../../assets/pictures/general_user.png'),
    activity: 'Active'
  },
  {
    uid: '2',
    name: 'Jangwon',
    image: require('../../assets/pictures/general_user.png'),
    activity: 'Active'
  },
  {
    uid: '3',
    name: 'Nathan',
    image: require('../../assets/pictures/general_user.png'),
    activity: 'Active'
  },
  {
    uid: '4',
    name: 'Daniel',
    image: require('../../assets/pictures/general_user.png'),
    activity: 'Active'
  },
  {
    uid: '5',
    name: 'Justin',
    image: require('../../assets/pictures/general_user.png'),
    activity: 'Active'
  }
]

export default function NetworkScreen({ navigation }) {
  const goToChat = () => navigation.navigate('Chat');
  const [searchText, setSearch] = useState('');
  const FriendItem = ({DATA}) => (
    <View style={styles.profileView}>
      <View style={{flexDirection:'row'}}>
        <Image 
        source={DATA.image}
        style={styles.profileImg}
        />
        <View styles={{flexDirection:'column' }}>
          <Text style={styles.profileText}>{DATA.name}</Text>
          <View style={{flexDirection:'row'}}>
            <View style={styles.circle} />
            <Text style={styles.profileSubText}>{DATA.activity}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={goToChat}>
        <Image
        source={require('../../assets/pictures/msg.png')}
        style={styles.msgImg}
        />
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <Image 
          source={require('../../assets/profile/settings.png')}
          style={styles.iconImg}
          
          />
        </TouchableOpacity>
        <Text style={styles.headerText} >Friends</Text>
        <TouchableOpacity>
          <Image 
          source={require('../../assets/profile/invite.png')}
          style={styles.iconImg}
          />
        </TouchableOpacity>
      </View>
      <TextInput
          style={styles.inputText}
          placeholder="Search ..."
          onChangeText={newSearch => setSearch(newSearch)}
          defaultValue= {searchText}
          placeholderTextColor="lightgrey"
      />
      <FlatList
      data = {FRIENDS}
      renderItem={({item}) => <FriendItem DATA={item}/>}
      keyExtractor={item => item.uid}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer : {
    flex: 1, 
    backgroundColor: 'white',
    
  },
  headerText :{
    color: 'black',
    fontSize: 22,
    fontWeight: '600',
    paddingVertical:10
  },
  headerView :{
    justifyContent:'space-between', 
    flexDirection:'row',
    marginVertical: 10,
    marginHorizontal: 10
  },
  iconImg : {
    width: 25,
    height: 25,
    marginHorizontal: 10,
    marginVertical: 10,
    
  },
  inputText: {
    width: '80%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    borderColor: 'lightgrey',
    borderWidth: 2,
    alignSelf: 'center',
    paddingVertical: 15
    
},
  profileView : {
    flexDirection:'row',
    height: 85,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'lightgrey',
    borderWidth: 1
  },
  profileImg : {
    width: 55,
    height: 55,
    marginHorizontal: 20,
    marginVertical: 10,
    
  },
  msgImg : {
    width: 45,
    height: 45,
    marginHorizontal: 20,
    marginVertical: 10,
    
  },
  profileText :{
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    paddingVertical:5
  },
  profileSubText :{
    color: 'black',
    fontSize: 12,
    fontWeight: '400',
    paddingVertical:5
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
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: "green",
    marginRight: 5,
    marginVertical: 8
  },
})
