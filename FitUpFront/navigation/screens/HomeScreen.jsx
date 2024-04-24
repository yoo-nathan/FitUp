import React, {useState, useEffect} from 'react';


import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  Switch,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  Pressable,
  
} from 'react-native';
import { getUserInfo } from '../../service/getService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMyID } from '../../service/chatService';


export default function HomeScreen({ route, navigation }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  const picURL = {uri: 'https://res.cloudinary.com/peloton-cycle/image/fetch/f_auto,c_limit,w_3840,q_90/https://images.ctfassets.net/6ilvqec50fal/7phXLCGAsmdelHmGrb33ID/1407d5437076e04de863901ad121eb52/talk-test-conversational-pace.jpg'};

  const showModal = (id) => {
    setIsModalVisible(true)
    const USER = data.find(item => item.profile.UID === id);
    setUser(USER.profile)
  } 
  const hideModal = () => setIsModalVisible(false);
  const goToChat = (UID) => {
    setIsModalVisible(false)
    navigation.navigate('Chat', {
      screen: 'ChatRoom',
      params: { to_id: UID }
    })
  }

  useEffect(() => {
    // console.log(route.params?.filters);
    const fetchUserInfo = async () =>{
      const token = await AsyncStorage.getItem('userToken');
      const uid = await getMyID(token);
      const userInfo = await getUserInfo(uid, route.params?.filters);
      setData(userInfo);
    }
    fetchUserInfo();
}, [route.params]);
  
  const UserCard = ({DATA}) => (
    <SafeAreaView> 
      <TouchableOpacity 
        style={styles.userCard}
        onPress={() => showModal(DATA.UID)}>
        <Image resizeMode='contain' style={styles.userImg} source={picURL} />
        <View style={styles.userInfo}>
          <Text style={{fontSize:28, fontWeight:'700'}}>{DATA.first_name} {DATA.last_name}</Text>
          <Text style={{fontSize: 16, fontWeight:'700'}}>H: {DATA.height} in / W: {DATA.weight} lbs</Text>
          <Text/>
          <Text style={{fontSize: 14, fontWeight:'700'}}>Click to view details! </Text>
        </View>
      </TouchableOpacity>
      {user && (
        <Modal 
          visible={isModalVisible}
          animationType='fade'
          style={{opacity:0.5}}
          transparent
        > 
          <View style={styles.modalViewContainer}> 
            <View style={styles.modalCardView}> 
              <View style={styles.flexRow}>
                <Image resizeMode='contain' style={styles.userImg} source={user.image} />
                  <View style={styles.userInfo}>
                    <Text style={{fontSize:28, fontWeight:'700'}}>{user.first_name} {user.last_name}</Text>
                    <Text />
                    <Text style={{fontSize: 12, fontWeight:'700'}}>H: {user.height} in / W: {user.weight} lbs</Text>
                    <Text style={{fontSize: 12, fontWeight:'700'}}>Gender: {user.gender}</Text>
                    <Text style={{fontSize: 12, fontWeight:'700'}}>Purpose: {user.purpose}</Text>
                    <View style={{width: "90%"}}>
                      <Text style={{fontSize: 12, fontWeight:'700'}}>Usual workout time: {user.workout_schedule.slice(1, -1).replace(/"/g, '')}</Text>
                    </View>
                    
                  </View>
                  
              </View>
              <View style={styles.flexCol}>
                <View style={styles.hairline}/>
                <Text style={{fontSize: 15, fontWeight:'700', paddingVertical:6, paddingTop:10}}>Personal Records</Text>
                <Text style={{fontSize: 12, fontWeight:'700', paddingVertical:3 }}>Squat: {user.personal_records.squat} lbs</Text>
                <Text style={{fontSize: 12, fontWeight:'700', paddingVertical:3 }}>Bench: {user.personal_records.benchpress} lbs</Text>
                <Text style={{fontSize: 12, fontWeight:'700', paddingVertical:3 }}>Deadlift: {user.personal_records.deadlift} lbs</Text>
                <View style={styles.flexRow}>
                  <TouchableOpacity 
                  onPress={hideModal}
                  style={styles.buttonStyleCancel}>
                    <Text  
                    style={{
                      fontSize:15, 
                      fontWeight:'500',
                      textAlign:'center' 
                    }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={styles.buttonStyleChat}
                  onPress={() => goToChat(user.UID)}
                  >
                    <Text style={{
                      fontSize:15, 
                      fontWeight:'500',
                      textAlign:'center',
                      color: 'white' 
                    }}>Chat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View> 
          </View> 
        </Modal>
      )}
      
    </SafeAreaView>
  )

  const [isFilterVisible, setFilterVisible] = useState(false);
  const showFilter = () => setFilterVisible(true);
  const hideFilter = () => setFilterVisible(false);
  const useBooleanState = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const toggleValue = () => setValue(previousValue => !previousValue);
    return [value, toggleValue];
  };
  const [isPR, setPR] = useBooleanState(false);
  const [isWorkSched, setWorkSched] = useBooleanState(false);
  const [isPurpose, setPurpose] = useBooleanState(false);
  const FilterButton = () => (
    <View>
      <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={() => navigation.push('Filter')}
        >
        <Image 
          source={{uri:'https://i.pinimg.com/564x/db/bb/cc/dbbbcc5a04883c6e6215389b0cb5fcc1.jpg'}}
          style={{width: 25,
            height: 25,
            borderRadius: 10}}
        />
      </TouchableOpacity>
      <Modal visible={isFilterVisible}
        animationType='fade'
        transparent
      >
        
          <Pressable style={styles.upperModal} onPress={hideFilter}/>
          <View style={styles.lowerModal}>
            <View>
              <View style = {{flexDirection:'row', marginHorizontal: 14, marginVertical: 10, justifyContent: 'space-between',}}>
                <TouchableOpacity onPress={hideFilter}>
                  <Text 
                  style={styles.backArrow}
                  >&#8678;</Text>
                </TouchableOpacity>
                <Text style={styles.filterHead}>Filters</Text>
                <TouchableOpacity>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
                
              </View>
            </View>
            
            <Button title='hide' onPress={hideFilter}/>
          </View>
          
        
      </Modal>
    </View>
  )

  return (
    
    <SafeAreaView style={styles.container} >
      <View style={{backgroundColor: '#373F51'}}>

      
      <Text style={styles.headerText}>  
        Find your GymBuddy!
      </Text>
      <View style={styles.toggleView}>
        <FilterButton />
        <View style={{flexDirection:'row'}}>
          <Text style={styles.activeInactive}>
            {isEnabled ? 'Active' : 'Inactive'}
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      
        <FlatList
          data = {data}
          renderItem={({item}) => <UserCard DATA={item.profile}/>}
          keyExtractor={item => item.profile.UID}
          style={{height:565}}
        />
      
      
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 12
  },
  filterHead: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
    paddingVertical: 12
  },
  saveText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8075FF',
    paddingVertical: 18
  },
  backArrow: {
    fontSize: 40,
    fontWeight: '900',
    color: 'black',
    paddingVertical: 12
  },
  userCard : {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 25,
    height: 160, // adjust 
    flexDirection: 'row'
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  userImg :{
    width: 100,
    height: 140,
    borderRadius: 25
  },
  userInfo : {
    flexDirection: 'column',
    marginHorizontal: 10,
    
    
  },
  toggleView: {
    flexDirection:'row',
    // biome-ignore lint/suspicious/noDuplicateObjectKeys: <explanation>
    justifyContent:'flex-end', 
    marginHorizontal:25,
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingBottom: 10
  },
  activeInactive : {
    color:'white',
    fontSize: 12, 
    fontWeight:'700', 
    paddingHorizontal:10, 
    paddingVertical:8, 
  },
  modalViewContainer: { 
    flex: 1, 
    backgroundColor:'rgba(0,0,0,0.6)', 
    alignItems: 'center', 
    justifyContent: 'center', 
    
  }, 
  modalCardView : { 
    backgroundColor : 'rgba(255,255,255,1)' , 
    height : '55%' , 
    width : "85%", 
    borderRadius : 20, 
    alignItems : "center", 
    justifyContent : "center" 
  }, 
  flexRow: {
    flexDirection:'row' ,
    marginTop: 20
  },
  flexCol : { 
    flexDirection: 'column'  
  }, 
  text : { 
    fontSize : 20, 
    color : "green", 
    marginBottom:20 
  }, 
  hairline: {
    backgroundColor: 'black',
    height: 1,
    width: 300
  },
  buttonStyleCancel :{
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 40,
    width: 120,
    marginHorizontal: 10,
    flex:1
  },
  buttonStyleChat :{
    backgroundColor: '#8075FF',
    borderRadius: 30,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 40,
    width: 120,
    marginHorizontal: 10,
    flex:1
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  buttonText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  upperModal: {
    height: 100,
    backgroundColor: '#373F51',
    
  },
  lowerModal: {
    flex: 1, 
    backgroundColor: 'white',
    borderRadius: 25
  }
})


