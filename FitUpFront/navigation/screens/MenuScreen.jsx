import React, {useState} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Modal,
  Button,
  Image
  } from 'react-native';

export default function MenuScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);
  const Item = ({item}) => (
    <SafeAreaView>
      <TouchableOpacity 
        style={styles.item}
        onPress={showModal}>
          <Text style={styles.itemTitle}>
              {item.menu}
          </Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible}
      animationType='fade'
      transparent>
        <View style={styles.modalViewContainer}>
          <View style={styles.modalCardView}>
            <ModalPopUp item = {item}/>
            <Button title='hide' onPress={hideModal}/>
            
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
          <Text style={styles.pageHead}> Diet Recommendation </Text>
          <HeaderCard MACROS={MACROS}/>
          <Text style={styles.subhead}>DCT Menu Recommendation</Text>
          <FlatList
              horizontal={true}
              data={DCT}
              renderItem={({item}) => <Item item={item} />}
              style={styles.flatList}
          />
          <Text style={styles.subhead}>Cox Menu Recommendation</Text>
          <FlatList
              horizontal={true}
              data={COX}
              renderItem={({item}) => <Item item={item} />}
              style={styles.flatList}
          />
          
      </SafeAreaView>
  );
}

const ModalPopUp = ({item, MACROS}) => (
  <View style={{alignContent:"center",justifyContent:'center'}}>
    <Text style={{
      fontSize:30, 
      fontWeight:'900', 
      textAlign:'center',
      paddingVertical: 20,
      marginHorizontal: 5
    }}
    >{item.menu}</Text>
    <Text style={{
      fontSize: 18,
      fontWeight:'600',
      paddingVertical: 10,
      marginHorizontal: 10
    }}>Find this menu at: {item.location}!</Text>
    <View style={styles.hairline}/>
    <Text style={{
      fontSize: 16,
      fontWeight:'600',
      paddingVertical: 1,
      marginHorizontal: 10,
      marginTop: 20
    }}>Nutritional Information:</Text>
    <Text style={{
      fontSize: 16,
      fontWeight:'400',
      paddingVertical: 5,
      marginHorizontal: 25
    }}>Carbs: {item.carbs}g</Text>
    <Text style={{
      fontSize: 16,
      fontWeight:'400',
      paddingVertical: 5,
      marginHorizontal: 25
    }}>Protein: {item.protein}g</Text>
    <Text style={{
      fontSize: 16,
      fontWeight:'400',
      paddingVertical: 5,
      marginHorizontal: 25
    }}>Fat: {item.fat}g</Text>
    <Text style={{
      fontSize: 16,
      fontWeight:'400',
      paddingVertical: 5,
      marginHorizontal: 25,
      marginTop: 15,
      color: 'red'
    }}>Price: {item.price}</Text>
  </View>
)


const HeaderCard = ({MACROS}) => (
  <View style = {styles.headerCard}>
      <Text style = {styles.cardText}>
          Target Calories: {MACROS.targetCalorie} kcal 
      </Text>
      <View style={{
        flexDirection:'row', 
        alignContent:'center', 
        justifyContent:'center'}}>
      
        <Image resizeMode='contain'
          style={styles.iconImg}
          source={require('../../assets/pictures/carbs.png')}/>
        <Text style={styles.cardSubText}>
          : {MACROS.carbs}g 
        </Text>
        <Image resizeMode='contain'
          style={styles.iconImg}
          source={require('../../assets/pictures/protein.png')}/>
        <Text style={styles.cardSubText}>
          : {MACROS.protein}g 
        </Text>
        <Image resizeMode='contain'
          style={styles.iconImg}
          source={require('../../assets/pictures/fat.png')}/>
        <Text style={styles.cardSubText}>
          : {MACROS.dairy}g
        </Text>
      </View>
  </View>
)

const MACROS = {
  targetCalorie: 2500,
  carbs: 100,
  protein: 50,
  dairy: 20
};

const DCT = [
  {  
      menu: "1 serving of Noodle 1 serving of Noodle 1 serving of Noodle",
      carbs: 20,
      protein: 23,
      fat: 10,
      location: "Fire and Spice",
      price: "Meal Swipe"

  },
  {   
      menu: "2 pieces of Rotisserie Chicken",
      carbs: 20,
      protein: 23,
      fat: 10,
      location: "605 Kitchen",
      price: "Meal Swipe"
  },
  {   
      menu: "Turkey Dog",
      carbs: 20,
      protein: 23,
      fat: 10,
      location: "Flatiron",
      price: "Meal Swipe"
  }
];
const COX = [
  {
      menu: "Maru Bowl w/ Ginger Chicken Gochujang sauce",
      carbs: 20,
      protein: 23,
      fat: 10,
      location: "Maru",
      price: "11.89"
  },
  {   
      menu: "Steak Nachos",
      carbs: 20,
      protein: 23,
      fat: 10,
      location: "Twisted Taco",
      price: "10.09"
  },
  {   
      menu: "Cheese Pizza",
      carbs: 20,
      protein: 23,
      fat: 10,
      location: "Ray's Pizza",
      price: "3.75"
  }
];


const styles = StyleSheet.create({
  containerOld: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  textOld : { fontSize: 26, fontWeight: 'bold' },
  container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: '#373F51'
    },
    flatList:{
      height:130,
      flexGrow: 0
    },
    item: {
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 6,
      borderRadius: 25, 
      width: 375, // Fixed width for each item
      height: 100, // Fixed height for each item
      justifyContent: 'center',
      alignContent:'center'
      
    },
    title: {
      fontSize: 16,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: '500',
      flexWrap: 'wrap',
      textAlign: 'center'
    },
    pageHead: {
      fontSize: 26,
      fontWeight: '600',
      color: 'white',
      textAlign: 'center',
      paddingVertical: 15
    },
    headerCard: {
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 6,
      borderRadius: 25,
      width: 375, // Fixed width for each item
      height: 100,
      justifyContent: 'center',
      alignContent:'center'
    },
    cardText : {
      fontSize: 22,
      fontWeight: '500',
      textAlign: 'center',
    },
    cardSubText:{
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
      marginVertical: 10,
      paddingHorizontal: 5,
      paddingRight: 15
    },
    subhead :{
      color: 'white',
      marginHorizontal: 10,
      fontWeight: '600',
      fontSize : 20,
      paddingVertical: 8
    },
    iconImg :{
      width: 35,
      height: 35,
      borderRadius: 5,
      paddingHorizontal: 10
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
    hairline: {
      backgroundColor: 'black',
      height: 1,
      width: 300,
      
    },
})
