import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { register } from '../service/authService';


const WorkoutPreferences = ({ navigation }) => {
  const [workoutType, setWorkoutType] = useState('Click to select');
  const [modalVisible, setModalVisible] = useState(false);
  const [squatPR, setSquatPR] = useState('');
  const [benchPressPR, setBenchPressPR] = useState('');
  const [deadliftPR, setDeadliftPR] = useState('');
  const [preferences, setPreferences] = useState({
    similarBodyProfile: false,
    similarPR: false,
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
      console.log(workoutType);
      const token = await register(totalInfo);
      if (token) {
        navigation.navigate('ThankYou');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const WorkoutTypeOption = ({ option }) => (
    <Pressable
      style={styles.modalOption}
      onPress={() => {
        setWorkoutType(option);
        setModalVisible(!modalVisible);
      }}
    >
      <Text style={styles.modalOptionText}>{option}</Text>
    </Pressable>
  );

  const handlePreferenceSelect = (preference) => {
    setPreferences(prevState => ({
      ...prevState,
      [preference]: !prevState[preference],
    }));
  };

  const renderPreferenceButton = (label) => (
    <Pressable
      style={[styles.choiceButton, preferences[label] && styles.choiceButtonSelected]}
      onPress={() => handlePreferenceSelect(label)}
    >
      <Text style={styles.choiceButtonText}>{label.replace(/([A-Z])/g, ' $1').trim()}</Text>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Let us know about you!</Text>
      
      <Text style={[styles.label, styles.textWhite]}>Your Workout Style</Text>
      {/* Modal for selecting workout type */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {['Bodybuilding', 'Powerlifting', 'Cardio', 'Calisthenics'].map((option) => (
              <Pressable
                key={option}
                style={styles.modalOption}
                onPress={() => {
                  setWorkoutType(option);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.modalOption}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalOptionText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Workout type selection */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text>{workoutType}</Text>
      </TouchableOpacity>

      {/* Personal Records (PR) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Personal Records (PR)</Text>
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
        <Text style={styles.label}>Preferences in Workout Partner</Text>
        <View style={styles.row}>
          {renderPreferenceButton('SimilarBodyProfile')}
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
        <View style={styles.buttonInnerContainer}>
          <Text style={styles.buttonText}>Submit</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <FlatList
            data={['Bodybuilding', 'Powerlifting', 'Cardio', 'Calisthenics']}
            renderItem={({ item }) => <WorkoutTypeOption option={item} />}
            keyExtractor={(item) => item}
            style={styles.modalView}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#373F51',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  choiceButton: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#4b0082', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
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
  choiceButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  choiceButtonSelected: {
    backgroundColor: 'gray',
  },
  choiceButtonText: {
    textAlign: 'center',
  },
  modalOption: {
    padding: 20,
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 18,
  },

  textWhite: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 200,
  },
  centeredModalView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    maxHeight: '60%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOption: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white', 
  },

});

export default WorkoutPreferences;
