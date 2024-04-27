import axios from 'axios';
import { navigate } from './service/navigationService';

const apiClient = axios.create({
    baseURL: 'https://cs-370-420520.ue.r.appspot.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            console.log('Token expired: Redirecting to login.');
            localStorage.removeItem('userToken');
            navigate('SignInPage');
        } else if (error.response.status === 403) {
            console.log('Forbidden: Token may be invalid.');
        }
        return Promise.reject(error);
    }
);

export default apiClient;