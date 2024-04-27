import axios from 'axios';
import { navigate } from './service/navigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


const apiClient = axios.create({
    baseURL: 'https://cs-370-420520.ue.r.appspot.com',
    headers: {
        'Content-Type': 'application/json'
    }
});


apiClient.interceptors.response.use(
    response => response,
    async error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log('Token expired: Redirecting to login.');
                    await AsyncStorage.removeItem('userToken');
                    Alert.alert(
                        "Session Timeout",
                        "Your session has expired. Please sign in again to continue.",
                        [
                            { text: "Ok", onPress: () => navigate('SignInPage') }
                        ]
                    );
                    // break;
                case 403:
                    console.log('Forbidden: Token may be invalid.');
                    break;
                default:
                    console.log('An unexpected error occurred.');
                    break;
            }
        } else {
            console.error('Network or other error', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;