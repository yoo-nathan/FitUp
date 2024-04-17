import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { register } from '../service/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; 

const WorkoutPreferences = ({ navigation }) => {
  const [workoutType, setWorkoutType] = useState('Bodybuilding');
  const [squatPR, setSquatPR] = useState('');
  const [benchPressPR, setBenchPressPR] = useState('');
  const [deadliftPR, setDeadliftPR] = useState('');
  const [preferences, setPreferences] = useState({
    SimilarWorkoutSchedule: false,
    SimilarPr: false,
    samePurpose: false,
    sameGender: false,
    similarWorkoutStyle: false,
    noPreference: false,
  });
  const route = useRoute();
  const { email, password, firstName, lastName, gender, schoolYear, height, weight, purpose, workoutSchedule } = route.params;

  const totalInfo = {
    email: email,
    password: password,
    first_name: firstName,
    last_name: lastName,
    gender: gender,
    school_year: schoolYear,
    height: height,
    weight: weight,
    purpose: purpose,
    workout_schedule: workoutSchedule,
    workout_style: workoutType,
    personal_records: {
      squat: squatPR, 
      deadlift: deadliftPR,
      benchpress: benchPressPR
    },
    partner_preferences: preferences
  }

  const signUpPress = async () => {
    try {
      const tokenData = await register(totalInfo);
      if (tokenData) {
        await AsyncStorage.setItem('userToken', tokenData.token);
        navigation.navigate('ThankYou');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handlePreferenceSelect = (preference) => {
    setPreferences(prevState => ({
      ...prevState,
      [preference]: !prevState[preference],
    }));
  };

  const renderPreferenceButton = (label) => (
    <TouchableOpacity
      style={[styles.choiceButton, preferences[label] && styles.choiceButtonSelected]}
      onPress={() => handlePreferenceSelect(label)}
    >
      <Text style={styles.choiceButtonText}>{label.replace(/([A-Z])/g, ' $1').trim()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.header}>Let us know about you!</Text>

        <Text style={[styles.label, styles.textWhite]}>Your Workout Style*</Text>
        {/* Picker for selecting workout type */}
        <View style={styles.input}>
          <Picker
            selectedValue={workoutType}
            onValueChange={(itemValue) => setWorkoutType(itemValue)}
            style={{ width: '100%' }}
          >
            <Picker.Item label="Bodybuilding" value="Bodybuilding" />
            <Picker.Item label="Powerlifting" value="Powerlifting" />
            <Picker.Item label="Cardio" value="Cardio" />
            <Picker.Item label="Calisthenics" value="Calisthenics" />
          </Picker>
        </View>

        {/* Personal Records (PR) */}
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Personal Records* (PR)</Text>
          <TextInput
            style={styles.input}
            placeholder="Squat (lbs)"
            value={squatPR}
            onChangeText={setSquatPR}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Bench Press (lbs)"
            value={benchPressPR}
            onChangeText={setBenchPressPR}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Deadlift (lbs)"
            value={deadliftPR}
            onChangeText={setDeadliftPR}
            keyboardType="numeric"
          />
        </View>

        {/* Preferences in Workout Partner */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preferences in Workout Partner*</Text>
          <View style={styles.row}>
            {renderPreferenceButton('SimilarWorkoutSchedule')}
            {renderPreferenceButton('SimilarPr')}
          </View>
          <View style={styles.row}>
            {renderPreferenceButton('SamePurpose')}
            {renderPreferenceButton('SameGender')}
          </View>
          <View style={styles.row}>
            {renderPreferenceButton('SimilarWorkoutStyle')}
            {renderPreferenceButton('NoPreference')}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={signUpPress}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    padding: 20,
    backgroundColor: '#373F51',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between', 
    padding: 10, 
    paddingBottom: 50, 
  },
  header: {
    fontWeight: "bold",
    fontSize: 29,
    color: "white",
    alignSelf: 'center',
    marginVertical: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    marginBottom: 9,
    fontWeight: '600',
    marginTop: 7,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  choiceButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 3,
    marginBottom: 5,
  },
  choiceButtonSelected: {
    backgroundColor: 'gray',
  },
  choiceButtonText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: '#8075FF', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 18, 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWhite: {
    color: 'white',
  },
});

export default WorkoutPreferences;
