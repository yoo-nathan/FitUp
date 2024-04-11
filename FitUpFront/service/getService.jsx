import axios from 'axios';

export const getFirstName = async (token) => {
  try {
    console.log('Fetching userinfo...')
    const response = await axios.get('http://localhost:3000/getInfo/userName', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    // const response = await axios.get('http://localhost:3000/users/authenticate/getInfo');

    if (response) {
      console.log("Fetching complete!");
      return response.data;
    }
  } catch(error) {
    console.log("Error occurred while fetching userinfo!")
    console.error(error);
  }
}