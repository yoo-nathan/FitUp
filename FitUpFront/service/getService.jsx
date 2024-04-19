import axios from 'axios';
const API_URL = 'http://localhost:3000';


export const getFirstName = async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/getInfo/userName`, {
      params: {
        uid: uid
      }
    });

    if (response) {
      return response.data;
    }
  } catch(error) {
    console.log("Error occurred while fetching username!")
    console.error(error);
  }
}

export const getUserInfo = async (uid, filters) => {
  try {
    const response = await axios.get(`${API_URL}/getInfo/homepage`, {
      params: {
        UID: uid,
        filters: filters
      }
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error occurred while fetching homepage info in service!")
    console.error(error);
  }
}

export const getUserEmail= async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/getInfo/userEmail`, {
      params: {
        UID: uid
      }
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error occurred while fetching usermail in service!")
    console.error(error);
  }
}