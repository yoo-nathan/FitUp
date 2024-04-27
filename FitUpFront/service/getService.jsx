import axios from 'axios';

const API_URL = "https://cs-370-420520.ue.r.appspot.com";
//const API_URL = 'http://localhost:3000';


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

export const getBMR = async (uid) => {
  try {
    console.log(uid)
    const response = await axios.get(`${API_URL}/getInfo/BMR`, {
      params: {
        UID: uid,
      }
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error occurred while fetching BMR info in service!")
    console.error(error);
  }
}

export const getDCT = async (uid) => {
  try {
    console.log("wtf")
    const response = await axios.get(`${API_URL}/getInfo/dct`, {
      params: {
        UID: uid
      }
    });
    console.log("Response received:", response.data);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error occurred while fetching DCT info in service!")
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

export const updateActive = async (uid) => {
  try {
    console.log(uid)
    const response = await axios.post(`${API_URL}/getInfo/updateActive`, { UID: uid });
    console.log('?')
    if (response) {
      console.log('toggled!');
      return response.data;
    }
  } catch (error) {
    console.log("Error occurred while updating active state!")
    console.error(error);
  }
}

export const getActive = async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/getInfo/getActive`, {
      params: {
        UID: uid
      }
    })

    if (response) {
      console.log(response.data)
      return response.data
    }
  } catch (error) {
    console.log("Error occurred while getting active status!")
    console.error(error);
  }
}