import axios from 'axios';
//const API_URL = 'http://localhost:3000';
const API_URL = "https://cs-370-420520.ue.r.appspot.com";

export const login = async(email, password) => {
    try {
        console.log('login')
        const response = await axios.post(`${API_URL}/users/authenticate/login`, {
            email: email,
            password: password,
        });
        console.log("response" + response)
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
        const response = await axios.post(`${API_URL}/users/authenticate/register`, {
            email: email,
            password: password,
            userInfo: restInfo
        })
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error(error)
    }
}