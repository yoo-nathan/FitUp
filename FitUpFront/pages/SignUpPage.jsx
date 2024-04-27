import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendVerificationEmail } from '../service/authService';

const SignUpPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dataCollectionAgreement, setDataCollectionAgreement] = useState(false);

    const canSignUp = () => {
        return email && password && password === confirmPassword && dataCollectionAgreement;
    };

    const handleSignUp = async () => {
        if (canSignUp()) {
            const realCode = await sendVerificationEmail(email);
            console.log(realCode.verificationCode);
          // Need to implement sign up logic 
            navigation.navigate('VerificationScreen', 
            { 
                email: email,
                password: password,
                realCode: realCode.verificationCode
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Sign up with your Emory email! </Text>
            <Text style={styles.sidetitle}> Email </Text>
            <TextInput
                style={styles.input}
                placeholder="example@emory.edu"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="gray"
            />
            <Text style={styles.sidetitle1}> Create password </Text>
            <TextInput
                style={styles.input}
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="gray"
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor="gray"
            />
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Data collection Agreement</Text>
                <Switch
                    value={dataCollectionAgreement}
                    onValueChange={setDataCollectionAgreement}
                />
            </View>
            <TouchableOpacity
            style={[styles.button, canSignUp() ? {} : styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={!canSignUp()}
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignInPage')}>
                <Text style={styles.signInText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#373F51',
        paddingVertical: 130, 
        textAlign: 'center', 
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    title:{
        fontWeight: "bold",
        fontSize: 27,
        color:"white",
        textAlign: 'center',
        justifyContent: 'center',
        padding: 20,
        },
    sidetitle:{
        fontWeight: "normal",
        fontSize:15,
        color:"white",
        textAlign: 'left',
        paddingVertical: 5,
        paddingRight: 250
    },
    sidetitle1:{
        fontWeight: "normal",
        fontSize:15,
        color:"white",
        textAlign: 'left',
        paddingVertical: 5,
        paddingRight: 150
    },
    input: {
        width: '80%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#8075FF',
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#777',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPwText: {
        color: 'white',
        textDecorationLine: 'underline',
        marginVertical: 10,
    },
    signInText: {
        color: 'white',
        textDecorationLine: 'underline',
        marginTop: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    switchLabel: {
        color: 'white',
    },
});

export default SignUpPage;
