import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';


const SignUpPage2 = ({ navigation }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [purpose, setPurpose] = useState('Lose weight'); // default 
    const [workoutSchedule, setWorkoutSchedule] = useState([]);
    const route = useRoute();
    const { email, password, firstName, lastName, gender, schoolYear } = route.params;

    const purposes = ['Lose weight', 'Gain weight', 'Maintain weight', 'Performance'];

    const canSignUp = () => {
        return height && weight && purpose && workoutSchedule;
    }

    const handleSignUp = () => {
        if (canSignUp()) {
            navigation.navigate('WorkoutPreferences',{
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                schoolYear: schoolYear,
                height: height,
                weight: weight,
                purpose: purpose,
                workoutSchedule: workoutSchedule
            })
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Let Us Know About You!</Text>
            <Text style={styles.subtitle}>Profile Setup</Text>

            <TextInput
                style={styles.input}
                placeholder="Height (enter 5.8 for 5'8)"
                keyboardType="default"
                value={height}
                onChangeText={setHeight}
            />

            <TextInput
                style={styles.input}
                placeholder="Weight (lbs)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={purpose}
                    style={styles.picker}
                    onValueChange={(itemValue) => setPurpose(itemValue)}
                >
                    {purposes.map((purpose, index) => (
                        <Picker.Item key={index} label={purpose} value={purpose} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.subtitle}>Preferred Workout Schedule:</Text>
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

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp} 
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#373F51',
        padding: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "white",
        alignSelf: 'center',
        marginVertical: 20,
    },
    subtitle: {
        fontWeight: "normal",
        fontSize: 20,
        color: "white",
        marginBottom: 20,
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
    pickerContainer: {
        backgroundColor: "#d3d3d3",
        borderRadius: 15,
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
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
    },
});

export default SignUpPage2;
