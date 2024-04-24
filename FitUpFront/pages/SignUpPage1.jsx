import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUpPage1 = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('');
  const route = useRoute();
  const { email, password } = route.params;
  const [profileImageURI, setProfileImageURI] = useState('https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png');

  const pickImage = async () => {
    // request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    try {
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
      // biome-ignore lint/style/useConst: <explanation>
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImageURI(result.assets[0].uri);
        console.log('New image URI:', result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error selecting profile picture:', error)
    }
  };

  const canSignUp = () => {
    return firstName && lastName && gender && age;
  };

  const handleSignUp = () => {
    if (canSignUp()) {
      navigation.navigate('SignUpPage2', { 
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age
      })
    }

    
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"  // ensure keyboard can be disabled by tapping outside
      >
        <Text style={styles.header}>Let us know about you!</Text>
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={styles.profilePic}
            source={{ uri: profileImageURI }}
          />
        </TouchableOpacity>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>First Name*</Text>
          <TextInput style={styles.input} placeholder="John" value={firstName} onChangeText={setFirstName} />
          <Text style={styles.inputLabel}>Last Name*</Text>
          <TextInput style={styles.input} placeholder="Parker" value={lastName} onChangeText={setLastName} />
          <Text style={styles.label}>Gender*</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={gender} onValueChange={setGender}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          <Text style={styles.label}>Age* (years)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="21" value={age} 
            onChangeText={setAge}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#373F51', 
  },
  container: {
    flex: 1,
    backgroundColor: '#373F51',
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between', 
    padding: 10, 
    paddingBottom: 50, 
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
    width: 150,
    height: 150,
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
