import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Picker } from 'react-native';

const ProfileInfoScreen = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [workoutPurpose, setWorkoutPurpose] = useState('');
  const [workoutSchedule, setWorkoutSchedule] = useState('');
  const [gender, setGender] = useState('');

  // Add other state variables as needed for tracking input

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Let us know about you!</Text>
      <Image
        style={styles.profilePic}
        source={require('../assets/icon.png')}
      />
      <View style={styles.inputGroup}>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Height (ft)"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Weight (lb)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </View>

        {/* Purpose of workout picker */}
        <TouchableOpacity style={styles.input} onPress={() => {/* open purpose picker */}}>
          <Text style={styles.inputText}>{workoutPurpose || 'Click to select'}</Text>
        </TouchableOpacity>

        {/* Preferred workout schedule picker */}
        <TouchableOpacity style={styles.input} onPress={() => {/* open schedule picker */}}>
          <Text style={styles.inputText}>{workoutSchedule || 'Click to select'}</Text>
        </TouchableOpacity>

        {/* Gender picker */}
        <TouchableOpacity style={styles.input} onPress={() => {/* open gender picker */}}>
          <Text style={styles.inputText}>{gender || 'Click to select'}</Text>
        </TouchableOpacity>

        {/* Next button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
    profilePic: {
      alignSelf: 'center',
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 30, 
    },
    inputGroup: {
      marginHorizontal: 20, 
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
    inputHalf: {
      width: '48%', 
    },
    inputText: {
      color: '#C7C7CD', 
    },
    button: {
      backgroundColor: '#4b0082', 
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 30,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default ProfileInfoScreen;
