import axios from 'axios';

export const login = async(email, password) => {
    try {
        const response = await axios.post('http://localhost:3000/authenticate/login', {
            email: email,
            password: password,
        });
        console.log(response)
        if (response) {
            return response.data;
        }
    } catch(error) {

    }
}