import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

const SignUpPage2 = ({ navigation }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [purpose, setPurpose] = useState('Lose weight');
    const [workoutSchedule, setWorkoutSchedule] = useState([]);
    const route = useRoute();
    const { email, password, firstName, lastName, gender, age } = route.params;

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
                age: age,
                height: height,
                weight: weight,
                purpose: purpose,
                workoutSchedule: workoutSchedule
            })
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                style={styles.container}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Text style={styles.header}>Let Us Know About You!</Text>
                <Text style={styles.subtitle}>Profile Setup*</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Height (enter 5.8 for 5'8)"
                    keyboardType="numeric"
                    value={height}
                    onChangeText={setHeight}
                    placeholderTextColor="gray"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Weight (lbs)"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                    placeholderTextColor="gray"
                />
                <Text style={styles.subtitle}>Purpose of Training*</Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={purpose}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setPurpose(itemValue)}
                    >
                        <Picker.Item label="Lose Weight" value="Lose Weight" />
                        <Picker.Item label="Gain Weight" value="Gain Weight" />
                        <Picker.Item label="Maintain Weight" value="Maintain" />
                        <Picker.Item label="Better Performance" value="Better Performance" />
                    </Picker>
                </View>

                <Text style={styles.subtitle}>Preferred Workout Schedule*</Text>
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
        fontWeight: "bold",
        fontSize: 29,
        color: "white",
        alignSelf: 'center',
        marginVertical: 20,
        marginTop: 20,
        marginBottom: 30,
    },
    subtitle: {
        color: 'white',
        marginBottom: 9,
        fontWeight: '600',
        marginTop: 6,
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
        color: '#333',
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
    button: {
        backgroundColor: '#8075FF',
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
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 20,
      },
    picker: {
        fontSize: 10
    },
});

export default SignUpPage2;