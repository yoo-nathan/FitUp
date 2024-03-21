import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker, ScrollView } from 'react-native';

export const ProfileSetupPage = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [personalRecords, setPersonalRecords] = useState({});
    const [workoutSchedule, setWorkoutSchedule] = useState([]);

    // Dummy data for exercise types
    const exercises = ['Bench Press', 'Squat', 'Deadlift'];

    const updatePersonalRecord = (exercise, record) => {
        setPersonalRecords(prevRecords => ({ ...prevRecords, [exercise]: record }));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Profile Setup</Text>
            <TextInput style={styles.input} placeholder="Weight (lbs)" keyboardType="numeric" value={weight} onChangeText={setWeight} />
            <TextInput style={styles.input} placeholder="Height (inches)" keyboardType="numeric" value={height} onChangeText={setHeight} />
            <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" value={age} onChangeText={setAge} />
            <TextInput style={styles.input} placeholder="Goal Weight (lbs)" keyboardType="numeric" value={goalWeight} onChangeText={setGoalWeight} />
            
            {exercises.map((exercise) => (
                <View key={exercise} style={styles.recordInputContainer}>
                    <Text style={styles.recordInputLabel}>{exercise} Personal Record (lbs):</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(record) => updatePersonalRecord(exercise, record)}
                        value={personalRecords[exercise]}
                    />
                </View>
            ))}

            <Text style={styles.subtitle}>Workout Schedule (Select all that apply):</Text>
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
                    <Text style={styles.dayText}>{day}</Text>
                </TouchableOpacity>
            ))}
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Complete Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "white",
        alignSelf: 'center',
        marginVertical: 20,
    },
    input: {
        width: "100%",
        backgroundColor: "#d3d3d3",
        borderRadius: 15,
        height: 50,
        marginBottom: 20,
        paddingLeft: 20,
        fontSize: 18,
    },
    recordInputContainer: {
        marginBottom: 20,
    },
    recordInputLabel: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    subtitle: {
        fontWeight: "normal",
        fontSize: 20,
        color: "white",
        marginBottom: 20,
    },
    day: {
        backgroundColor: '#2a2a2a',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
    },
    selectedDay: {
        backgroundColor: '#4b0082',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
    },
    dayText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4b0082',
        borderRadius: 15,
        height: 50,
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    }
});