import React, {useState, useEffect} from 'react';
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
  Image,
  Dimensions
  } from 'react-native';
import { getBMR } from '../../service/getService';
import { getDCT } from '../../service/getService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMyID } from '../../service/chatService';



export default function MenuScreen({ navigation }) {
  const [menu, setMenu] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState({});
  const [dct, setDCT] = useState([]);

  const showModal = (id) => {
    setIsModalVisible(true);
    const MENU = ALL.find(item => item.mid === id)
    setMenu(MENU)
    //console.log(menu)
    //console.log(id)
  }
  const hideModal = () => setIsModalVisible(false);

  useEffect(() => {
    const fetchBMRInfo = async () =>{
      const token = await AsyncStorage.getItem('userToken');
      const uid = await getMyID(token);
      const BMRInfo = await getBMR(uid);
      const DCTInfo = await getDCT(uid);
      setData(BMRInfo);
      setDCT(DCTInfo);
    }
    fetchBMRInfo();
  }, []);

  const MACROS = {
    targetCalorie: data[0],
    carbs: data[1], 
    protein: data[2],
    fat: data[3]
  };
  
  const Item = ({item}) => (
    <SafeAreaView>
      <TouchableOpacity 
        style={styles.item}
        onPress={() => showModal(item.mid)}>
          <Text style={styles.itemTitle}>
              {item.menu}
          </Text>
      </TouchableOpacity>
      {menu &&(
        <Modal visible={isModalVisible}
        animationType='fade'
        transparent>
          <View style={styles.modalViewContainer}>
            <View style={styles.modalCardView}>
              <ModalPopUp item = {menu}/>
              <Button title='hide' onPress={hideModal}/>
              
            </View>
          </View>
        </Modal>
      )}
        
      
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
          <Text style={styles.pageHead}> Diet Recommendation </Text>
          <HeaderCard MACROS={MACROS}/>
          <Text style={styles.subhead}>DCT Menu Recommendation</Text>
          <FlatList
              horizontal={true}
              data={dct}
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

const ModalPopUp = ({item}) => (
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
          source={{uri:'https://cdn-icons-png.flaticon.com/512/1276/1276022.png'}}/>
        <Text style={styles.cardSubText}>
          : {MACROS.carbs}g 
        </Text>
        <Image resizeMode='contain'
          style={styles.iconImg1}
          source={{uri:'https://png.pngtree.com/png-clipart/20230923/original/pngtree-high-protein-foods-vector-icon-illustration-exercise-body-powder-vector-png-image_12665260.png'}}/>
        <Text style={styles.cardSubText}>
          : {MACROS.protein}g 
        </Text>
        <Image resizeMode='contain'
          style={styles.iconImg}
          source={{uri:'https://static.thenounproject.com/png/3569311-200.png'}}/>
        <Text style={styles.cardSubText}>
          : {MACROS.fat}g
        </Text>
      </View>
  </View>
)




const DCT = [
  {
    mid: '24',
    menu: "Maru Bowl w/ Ginger Chicken Gochujang sauce",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Maru",
    price: "11.89"
  },
  { 
    mid: '25',  
    menu: "Steak Nachos",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Twisted Taco",
    price: "10.09"
  },
  { 
    mid: '26',  
    menu: "Cheese Pizza",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Ray's Pizza",
    price: "3.75"
  }
];

const COX = [
  {
    mid: '24',
    menu: "Maru Bowl w/ Ginger Chicken Gochujang sauce",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Maru",
    price: "11.89"
  },
  { 
    mid: '25',  
    menu: "Steak Nachos",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Twisted Taco",
    price: "10.09"
  },
  { 
    mid: '26',  
    menu: "Cheese Pizza",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Ray's Pizza",
    price: "3.75"
  }
];

const ALL = [
  {  
    mid: '11',  
    menu: "1 serving of Noodle 1 serving of Noodle 1 serving of Noodle",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Fire and Spice",
    price: "Meal Swipe"

  },
  { 
    mid: '12',  
    menu: "2 pieces of Rotisserie Chicken",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "605 Kitchen",
    price: "Meal Swipe"
  },
  { 
    mid: '13',  
    menu: "Turkey Dog",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Flatiron",
    price: "Meal Swipe"
  },
  {
    mid: '24',
    menu: "Maru Bowl w/ Ginger Chicken Gochujang sauce",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Maru",
    price: "11.89"
  },
  { 
    mid: '25',  
    menu: "Steak Nachos",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Twisted Taco",
    price: "10.09"
  },
  { 
    mid: '26',  
    menu: "Cheese Pizza",
    carbs: 20,
    protein: 23,
    fat: 10,
    location: "Ray's Pizza",
    price: "3.75"
  }
];

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

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
      height:150,
      flexGrow: 0
    },
    item: {
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 10,
      marginHorizontal: screenWidth *0.04,
      borderRadius: 25, 
      width: screenWidth *0.92, // Fixed width for each item
      height: screenHeight * 0.15, // Fixed height for each item
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
      marginHorizontal: screenWidth* 0.04,
      borderRadius: 25,
      width: screenWidth* 0.92, // Fixed width for each item
      height: screenHeight * 0.15,
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
    iconImg1 :{
      width: 45,
      height: 45,
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
      width: screenWidth * 0.8,
      marginLeft:10,
      opacity:0.5
      
    },
})
