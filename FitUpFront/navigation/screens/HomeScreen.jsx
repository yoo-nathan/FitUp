import React, {useState} from 'react';
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

const USER_DATA = [
  {
    uid: '1',
    name: "Swoop",
    height_ft: 6,
    height_in: 1,
    weight: 200,
    image: require('../../assets/pictures/user1.png'),
    squat_pr: 200,
    bench_pr: 225,
    deadlift_pr: 320,
    gender: "M",
    purpose: "Bodybuilding",
    workout_time: "afternoon"
  },
  {
    uid: '2',
    name: "Dooley",
    height_ft: 6,
    height_in: 4,
    weight: 220,
    image: require('../../assets/pictures/user1.png'),
    squat_pr: 300,
    bench_pr: 205,
    deadlift_pr: 220,
    gender: "M",
    purpose: "Cutting",
    workout_time: "morning"
  },
  {
    uid: '3',
    name: "Greg Fenves",
    height_ft: 5,
    height_in: 10,
    weight: 150,
    image: require('../../assets/pictures/user1.png'),
    squat_pr: 250,
    bench_pr: 255,
    deadlift_pr: 220,
    gender: "M",
    purpose: "n/a",
    workout_time: "n/a"
  },
  {
    uid: '4',
    name: "Jangwon",
    height_ft: 7,
    height_in: 1,
    weight: 300,
    image: require('../../assets/pictures/user1.png'),
    squat_pr: 300,
    bench_pr: 285,
    deadlift_pr: 420,
    gender: "M",
    purpose: "Bodybuilding",
    workout_time: "Anytime"
  }
]
const TEST = {
  name: "Jangwon",
    height_ft: 7,
    height_in: 1,
    weight: 300,
    image: require('../../assets/pictures/user1.png')
}

/*

*/



export default function HomeScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const showModal = (id) => {
    setIsModalVisible(true)
    const USER = USER_DATA.find(item => item.uid === id)
    setUser(USER)
  } 
  const hideModal = () => setIsModalVisible(false);
  const goToChat = () => { //need to implement new chat with specific person
    setIsModalVisible(false)
    navigation.navigate('Chat')
  }
  
  const UserCard = ({DATA}) => (
    <SafeAreaView> 
      <TouchableOpacity 
        style={styles.userCard}
        onPress={() => showModal(DATA.uid)}>
        <Image resizeMode='contain' style={styles.userImg} source={DATA.image} />
        <View style={styles.userInfo}>
          <Text style={{fontSize:28, fontWeight:'700'}}>{DATA.name}</Text>
          <Text style={{fontSize: 16, fontWeight:'700'}}>H: {DATA.height_ft}' {DATA.height_in}" / W: {DATA.weight} lbs</Text>
          <Text></Text>
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
                    <Text style={{fontSize:28, fontWeight:'700'}}>{user.name}</Text>
                    <Text></Text>
                    <Text style={{fontSize: 12, fontWeight:'700'}}>H: {user.height_ft}' {user.height_in}" / W: {user.weight} lbs</Text>
                    <Text style={{fontSize: 12, fontWeight:'700'}}>Gender: {user.gender}</Text>
                    <Text style={{fontSize: 12, fontWeight:'700'}}>Purpose: {user.purpose}</Text>
                    <Text style={{fontSize: 12, fontWeight:'700'}}>Usual workout time: {user.workout_time}</Text>
                  </View>
                  
              </View>
              <View style={styles.flexCol}>
                <View style={styles.hairline}/>
                <Text style={{fontSize: 15, fontWeight:'700', paddingVertical:6, paddingTop:10}}>Personal Records</Text>
                <Text style={{fontSize: 12, fontWeight:'700', paddingVertical:3 }}>Squat: {user.squat_pr} lbs</Text>
                <Text style={{fontSize: 12, fontWeight:'700', paddingVertical:3 }}>Bench: {user.bench_pr} lbs</Text>
                <Text style={{fontSize: 12, fontWeight:'700', paddingVertical:3 }}>Deadlift: {user.deadlift_pr} lbs</Text>
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
                  onPress={goToChat}
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
  
  const FilterButton = () => (
    <View>
      <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={showFilter}
        >
        <Image 
          source={require('../../assets/pictures/filter.png')}
          style={{width: 25,
            height: 25,
            borderRadius: 10}}
        />
      </TouchableOpacity>
      <Modal visible={isFilterVisible}
        animationType='fade'
      >
        <SafeAreaView>
          <Button title='hide' onPress={hideFilter}/>
        </SafeAreaView>
      </Modal>
    </View>
  )

  return (
    
    <SafeAreaView style={styles.container} >
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
        data = {USER_DATA}
        renderItem={({item}) => <UserCard DATA={item}/>}
        keyExtractor={item => item.uid}
      />
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#373F51'
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
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
    flexDirection:'row' 
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
    backgroundColor: '#DDD',
    opacity: 0.5
  },
  lowerModal: {
    flex: 1, 
    backgroundColor: 'white'
  }
})