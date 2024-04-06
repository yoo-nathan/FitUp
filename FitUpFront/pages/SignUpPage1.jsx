import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


const SignUpPage1 = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
      <Image style={styles.profilePic} 
      // source={require('../assets/profile.png')} 
      />
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput style={styles.input} placeholder="John" value={firstName} onChangeText={setFirstName} />
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput style={styles.input} placeholder="Doe" value={lastName} onChangeText={setLastName} />
        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={gender} onValueChange={setGender}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
        <Text style={styles.label}>School Year</Text>
        <TextInput style={styles.input} placeholder="2024" value={schoolYear} onChangeText={setSchoolYear} />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
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
    padding: 20,
  },
  header: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  profilePic: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
  inputGroup: {
    marginVertical: 10,
  },
  inputLabel: {
    color: 'white',
    marginBottom: 5,
    fontWeight: '600',
  },
  label: {
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8075FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignUpPage1;
