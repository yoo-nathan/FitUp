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
  },
  
]
const TEST = {
  name: "Jangwon",
    height_ft: 7,
    height_in: 1,
    weight: 300,
    image: require('../../assets/pictures/user1.png')
}





export default function HomeScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);
  
  const UserCard = ({DATA}) => (
    <SafeAreaView> 
      <TouchableOpacity 
        style={styles.userCard}
        onPress={showModal}>
        <Image resizeMode='contain' style={styles.userImg} source={DATA.image} />
        <View style={styles.userInfo}>
          <Text style={{fontSize:28, fontWeight:'700'}}>{DATA.name}</Text>
          <Text style={{fontSize: 16, fontWeight:'700'}}>H: {DATA.height_ft}' {DATA.height_in}" / W: {DATA.weight} lbs</Text>
          <Text></Text>
          <Text style={{fontSize: 14, fontWeight:'700'}}>Click to view details! </Text>
        </View>
      </TouchableOpacity>
      <Modal 
        visible={isModalVisible}
        animationType='fade'
        style={{opacity:0.5}}
        transparent
      > 
        <View style={styles.modalViewContainer}> 
          <View style={styles.modalCardView}> 
            <View style={styles.flexRow}>
              <Image resizeMode='contain' style={styles.userImg} source={DATA.image} />
                <View style={styles.userInfo}>
                  <Text style={{fontSize:28, fontWeight:'700'}}>{DATA.name}</Text>
                  <Text></Text>
                  <Text style={{fontSize: 12, fontWeight:'700'}}>H: {DATA.height_ft}' {DATA.height_in}" / W: {DATA.weight} lbs</Text>
                  <Text style={{fontSize: 12, fontWeight:'700'}}>Gender: {DATA.gender}</Text>
                  <Text style={{fontSize: 12, fontWeight:'700'}}>Purpose: {DATA.purpose}</Text>
                  <Text style={{fontSize: 12, fontWeight:'700'}}>Usual workout time: {DATA.workout_time}</Text>
                </View>
                
            </View>
            <View style={styles.flexCol}>
              <View style={styles.hairline}/>
              <Text style={{fontSize: 15, fontWeight:'700', paddingVertical:6, paddingTop:10}}>Personal Records</Text>
              <Text style={{fontSize: 12, fontWeight:'700', paddingVertical:3 }}>Squat: {DATA.squat_pr} lbs</Text>
              <Text style={{fontSize: 12, fontWeight:'700', paddingVertical:3 }}>Bench: {DATA.bench_pr} lbs</Text>
              <Text style={{fontSize: 12, fontWeight:'700', paddingVertical:3 }}>Deadlift: {DATA.deadlift_pr} lbs</Text>
              <View style={styles.flexRow}>
                <TouchableOpacity style={styles.buttonStyleCancel}>
                  <Text onPress={hideModal} 
                  style={{
                    fontSize:15, 
                    fontWeight:'500',
                    textAlign:'center' 
                  }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyleChat}>
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
    </SafeAreaView>
  )
  return (
    
    <SafeAreaView style={styles.container} >
      <Text style={styles.headerText}>  
        Find your GymBuddy!
      </Text>
      <View style={styles.toggleView}>
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
      <FlatList
        data = {USER_DATA}
        renderItem={({item}) => <UserCard DATA={item}/>}
      
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

  }
})