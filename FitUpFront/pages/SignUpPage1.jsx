import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


const SignUpPage1 = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [workoutPurpose, setWorkoutPurpose] = useState('');
  // const [workoutSchedule, setWorkoutSchedule] = useState('');
  const [gender, setGender] = useState('Male');
  const [schoolYear, setSchoolYear] = useState('');
  const route = useRoute();
  const { email, password } = route.params;

  const canSignUp = () => {
    return firstName && lastName && gender && schoolYear;
  };

  const handleSignUp = () => {
    if (canSignUp()) {
      navigation.navigate('SignUpPage2', { 
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        schoolYear: schoolYear
      })
    }

    
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Let us know about you!</Text>
      <Image
        style={styles.profilePic}
        // source={require('../assets/profile.png')}
      />
      <View style={styles.inputGroup}>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <Text>Gender</Text>
        <View style={styles.otherContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <Text>School Year</Text>
        <View>
          <TextInput
              style={[styles.input]}
              placeholder="School Year (ex. 2024)"
              value={schoolYear}
              onChangeText={setSchoolYear}
            />
        </View>

        <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
            >
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
      backgroundColor: '#8075FF', 
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 30,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    otherContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 0,
      height: 'auto'
    },
    picker: {
      fontSize: 10
    }
  });

export default SignUpPage1;