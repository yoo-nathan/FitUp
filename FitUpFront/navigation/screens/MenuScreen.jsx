import * as React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity 
  } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
          <Text style={styles.pageHead}> Diet Recommendation </Text>
          <HeaderCard MACROS={MACROS}/>
          <Text style={styles.subhead}>DCT Menu Recommendation</Text>
          <FlatList
              horizontal={true}
              data={DCT}
              renderItem={({item}) => <Item title={item.menu} />}
              style={styles.flatList}
          />
          <Text style={styles.subhead}>Cox Menu Recommendation</Text>
          <FlatList
              horizontal={true}
              data={COX}
              renderItem={({item}) => <Item title={item.menu} />}
              style={styles.flatList}
          />
          
      </SafeAreaView>
  );
}
const handleMenuPress = () => console.log("Impletement")

const Item = ({title}) => (
  <TouchableOpacity 
    style={styles.item}
    onPress={handleMenuPress}>
      <Text style={styles.itemTitle}>
          {title}
      </Text>
  </TouchableOpacity>
);



const HeaderCard = ({MACROS}) => (
  <View style = {styles.headerCard}>
      <Text style = {styles.cardText}>
          Target Calories: {MACROS.targetCalorie} kcal 
      </Text>
      <Text style={styles.cardSubText}>
          Carbs: {MACROS.carbs}g, Protein: {MACROS.protein}g, Dairy: {MACROS.dairy}g
      </Text>
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
      menu: "1 serving of Noodle 1 serving of Noodle 1 serving of Noodle"
  },
  {   
      menu: "2 pieces of Rotisserie Chicken"
  },
  {   
      menu: "Turkey Dog"
  }
];
const COX = [
  {
      menu: "Maru Bowl w/ Ginger Chicken Gochujang sauce"
  },
  {   
      menu: "Twisted Taco"
  },
  {   
      menu: "Cheese Pizza"
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
      borderRadius: 15, 
      width: 350, // Fixed width for each item
      height: 100, // Fixed height for each item
      
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
      borderRadius: 15,
      width: 375, // Fixed width for each item
      height: 100
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
    },
    subhead :{
      color: 'white',
      marginHorizontal: 10,
      fontWeight: '600',
      fontSize : 20,
      paddingVertical: 8
    }
})
