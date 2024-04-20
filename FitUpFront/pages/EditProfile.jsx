import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';



const USER = {
    height : 5.9,
    weight: 160,

}


const EditProfile = ({navigation}) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [workoutSchedule, setWorkoutSchedule] = useState([]);
  const [purpose, setPurpose] = useState('Lose weight');
  const [squatPR, setSquatPR] = useState('');
  const [benchPressPR, setBenchPressPR] = useState('');
  const [deadliftPR, setDeadliftPR] = useState('');
  const handleSave = () => {
    navigation.navigate('MainContainer')
  }



  // Add other state variables as needed for tracking input
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      
      <View style={styles.inputGroup}>

        <View style={styles.row}>
            <View style={{flexDirection:'column'}}>
                <Text style={styles.subHead}>Height:</Text>
                <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholderTextColor="gray"
                placeholder="Height (ft.in)"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                />
            </View>
            <View style={{flexDirection:'column'}}>
                <Text style={styles.subHead}>Weight:</Text>
                <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholderTextColor="gray"
                placeholder="Weight (lbs)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                />
            </View>
        </View>
        <Text style={styles.subHead}>Workout Purpose:</Text>
        <View style={styles.otherContainer}>
                <Picker
                    selectedValue={purpose}
                    style={styles.picker}
                    itemStyle={{fontSize:14, height:100}}
                    onValueChange={(itemValue, itemIndex) => setPurpose(itemValue)}
                >
                    <Picker.Item label="Lose Weight" value="Lose Weight" />
                    <Picker.Item label="Gain Weight" value="Gain Weight" />
                    <Picker.Item label="Maintain Weight" value="Maintain" />
                    <Picker.Item label="Better Performance" value="Better Performance" />
                </Picker>
        </View>
        <Text style={[styles.subHead, {marginVertical:10}]}>Personal Records:</Text>
        <View style={styles.prView}>
            <View style={[styles.row, {marginVertical:5, marginTop: 10, marginRight: 10}]}>
                <Text style={[styles.prText]}>Bench:</Text>
                <TextInput
                style={[styles.prInput]}
                placeholderTextColor="gray"
                placeholder="(lbs)"
                value={benchPressPR}
                onChangeText={setBenchPressPR}
                keyboardType="numeric"
                />
            </View>
            <View style={[styles.row, {marginVertical:5,  marginRight: 10}]}>
                <Text style={[styles.prText]}>Squat:</Text>
                <TextInput
                style={[styles.prInput]}
                placeholderTextColor="gray"
                placeholder="(lbs)"
                value={squatPR}
                onChangeText={setSquatPR}
                keyboardType="numeric"
                />
            </View>
            <View style={[styles.row, {marginVertical:5, marginBottom: 10, marginRight: 10}]}>
                <Text style={[styles.prText]}>Deadlift:</Text>
                <TextInput
                style={[styles.prInput]}
                placeholderTextColor="gray"
                placeholder="(lbs)"
                value={deadliftPR}
                onChangeText={setDeadliftPR}
                keyboardType="numeric"
                />
            </View>
        </View>
        <Text style={[styles.subHead, {marginVertical:10}]}>Preferred Workout Schedule:</Text>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <TouchableOpacity
                    key={day}
                    style={workoutSchedule.includes(day) ? styles.selectedDay : styles.day}
                    onPress={() => {
                        if (workoutSchedule.includes(day)) {
                            setWorkoutSchedule(workoutSchedule.filter(d => d !== day));
                        } else {
                            setWorkoutSchedule([...workoutSchedule, day]);
                        }
                    }}
                >
                    <Text style={[styles.dayText, workoutSchedule.includes(day) && styles.selectedText]}>{day}</Text>
                </TouchableOpacity>
            ))}
        
        
        <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        {/* Save button */}
        <TouchableOpacity 
        style={styles.button}
        
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#373F51', 
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white', 
      textAlign: 'center',
      marginTop: 100, 
      marginBottom: 40, 
    },
    selectedText: {
        fontWeight: "bold",
    },
    subHead:{
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        paddingBottom: 5,
        marginLeft: 5,
        marginBottom: 5
    },
    prText:{
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    prView:{
        //marginLeft: 40,
        //backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 10

    },
    profilePic: {
      alignSelf: 'center',
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 30, 
    },
    inputGroup: {
      marginHorizontal: screenWidth * 0.05, 
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input: {
      backgroundColor: 'white',
      padding: 15,
      marginBottom: 15,
      borderRadius: 10,
    },
    prInput: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        width: screenWidth * 0.575
      },
    inputHalf: {
      width: screenWidth * 0.425, 
    },
    inputText: {
      color: '#C7C7CD', 
    },
    button: {
      backgroundColor: '#4b0082', 
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 55
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16
    },
    cancelButton: {
        backgroundColor: 'lightgrey', 
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 60,
        
      },
      cancelButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
      },
    day: {
        backgroundColor: '#2a2a2a',
        borderRadius: 40,
        padding: 13,
        marginBottom: 5,
    },
    selectedDay: {
        backgroundColor: '#b4a7d6',
        borderRadius: 40,
        padding: 13,
        marginBottom: 5,
    },
    dayText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    otherContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        height: 'auto',
        marginBottom: 10,
        justifyContent:'center'
      },
      picker: {
        fontSize: 5,
        height:100
        
    },
  });




export default EditProfile;
