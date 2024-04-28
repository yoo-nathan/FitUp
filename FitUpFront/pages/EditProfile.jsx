import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from '../service/authService';
import { getMyID } from '../service/chatService';

const EditProfile = ({ navigation }) => {
  // State hooks for various fields
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [workout_schedule, setWorkoutSchedule] = useState([]);
  const [purpose, setPurpose] = useState('Lose weight');
  const [squatPR, setSquatPR] = useState('');
  const [benchPressPR, setBenchPressPR] = useState('');
  const [deadliftPR, setDeadliftPR] = useState('');
  const [profileImageURI, setProfileImageURI] = useState('https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png');
  const [imageKey, setImageKey] = useState(0);

  const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const token = await AsyncStorage.getItem('userToken');
    const uid = await getMyID(token);

    console.log('Image URI:', result.uri);  // Debugging log
    console.log('Image Type:', result.type);  // Debugging log
    console.log('UID:', uid);  // Debugging log

    const formData = new FormData();
    formData.append('profilePic', {
      uri: result.uri,
      type: 'image/jpeg',  // Assuming JPEG, adjust if your app can use different types
      name: 'profilePic.jpg',
    });
    formData.append('UID', uid);

    try {
      const response = await fetch('https://cs-370-420520.ue.r.appspot.com/getInfo/changePic', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseText = await response.text();
      console.log('Server Response:', responseText);  // Debugging log

      if (response.ok) {
        alert(responseText); 
        setProfileImageURI(result.uri);
        setImageKey(prevKey => prevKey + 1);
      } else {
        alert(`Failed to upload image: ${responseText}`);
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    }
  }
};

  const handleSave = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const UID = await getMyID(userToken);
    console.log(UID);

    const info = {
      UID,
      height,
      weight,
      purpose,
      squatPR,
      benchPressPR,
      deadliftPR,
      workout_schedule
    };
    console.log(info);
    const res = await updateProfile(info);

    if (res) {
      navigation.navigate('MainContainer');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture Container */}
      <TouchableOpacity onPress={pickImage} style={styles.profilePicContainer}>
        <Image
          key={imageKey}
          style={styles.profilePic}
          source={{ uri: `${profileImageURI}?key=${imageKey}` }}
        />
      </TouchableOpacity>

      <Text style={styles.header}>Edit Profile</Text>

      <View style={styles.inputGroup}>
        <View style={styles.row}>
          <View style={{ flexDirection: 'column' }}>
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
          <View style={{ flexDirection: 'column' }}>
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
            itemStyle={{ fontSize: 14, height: 100 }}
            onValueChange={(itemValue, itemIndex) => setPurpose(itemValue)}
          >
            <Picker.Item label="Lose Weight" value="Lose Weight" />
            <Picker.Item label="Gain Weight" value="Gain Weight" />
            <Picker.Item label="Maintain Weight" value="Maintain" />
            <Picker.Item label="Better Performance" value="Better Performance" />
          </Picker>
        </View>
        <Text style={[styles.subHead, { marginVertical: 10 }]}>Personal Records:</Text>
        <View style={styles.prView}>
          <View style={[styles.row, { marginVertical: 5, marginTop: 10, marginRight: 10 }]}>
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
          <View style={[styles.row, { marginVertical: 5, marginRight: 10 }]}>
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
          <View style={[styles.row, { marginVertical: 5, marginBottom: 10, marginRight: 10 }]}>
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
        <Text style={[styles.subHead, { marginVertical: 10 }]}>Preferred Workout Schedule:</Text>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <TouchableOpacity
            key={day}
            style={workout_schedule.includes(day) ? styles.selectedDay : styles.day}
            onPress={() => {
              if (workout_schedule.includes(day)) {
                setWorkoutSchedule(workout_schedule.filter(d => d !== day));
              } else {
                setWorkoutSchedule([...workout_schedule, day]);
              }
            }}
          >
            <Text style={[styles.dayText, workout_schedule.includes(day) && styles.selectedText]}>{day}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
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
  subHead: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    paddingBottom: 5,
    marginLeft: 5,
    marginBottom: 5
  },
  prText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  prView: {
    borderRadius: 20,
    marginBottom: 10
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
  button: {
    backgroundColor: '#4b0082',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 55
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
    justifyContent: 'center'
  },
  picker: {
    height: 100
  },
  profilePicContainer: {
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default EditProfile;
