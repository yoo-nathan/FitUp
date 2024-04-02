import axios from 'axios';

export const login = async(email, password) => {
    try {
        console.log('here')
        const response = await axios.post('http://localhost:3000/users/authenticate/login', {
            email: email,
            password: password,
        });
        if (response) {
            return response.data;
        }
    } catch(error) {
        console.error(error);
    }
}