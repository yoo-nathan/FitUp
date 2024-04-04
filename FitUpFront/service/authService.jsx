import axios from 'axios';

export const login = async(email, password) => {
    try {
        // console.log('here')
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

export const register = async(totalInfo) => {
    const {email, password, ...restInfo} = totalInfo;
    try {
        console.log('here')
        const response = await axios.post('http://localhost:3000/users/authenticate/register', {
            email: email,
            password: password,
            userInfo: restInfo
        })
        console.log(response)
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error(error)
    }
}