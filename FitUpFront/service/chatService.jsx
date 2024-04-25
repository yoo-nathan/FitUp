import axios from 'axios';

const API_URL = "https://cs-370-420520.ue.r.appspot.com";
//const API_URL = "http://localhost:3000";

export const getMyID = async(token) => {
  try {
    const response = await axios.get(`${API_URL}/chat/getMyUid`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log("Error occurred while getting my UID!")
    console.error(error);
  }
}

export const saveChat = async(from_id, to_id, message) => {
    try {
        const response = await axios.post(`${API_URL}/chat/saveLog`, {
            from_id: from_id,
            to_id: to_id,
            message: message
        });

        if (response) {
            return response.data;
        }
    } catch(error) {
        console.error(error);
    }
}

export async function getChatHistory(from_id, to_id) {
  try {
    const response = await axios.get(`${API_URL}/chat/getHistory`, {
      params: {
        from_id: from_id,
        to_id: to_id
      }
    });
    if (response){
      return response.data;
    }

    if (response.data.length === 0) {
      console.log('no result')
    }
  } catch (error) {
    console.error('Failed to fetch chat history:', error);
    throw error;
  }
}

export async function getChatList(user_id) {
  try {
    const response = await axios.get(`${API_URL}/chat/getList`, {
      params: {
        userId: user_id,
      }
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch chat list:', error);
    throw error;
  }
}

export async function markAsRead(roomId, toId) {
  try {
    const response = await axios.post(`${API_URL}/chat/markAsRead`, {
      roomId: roomId,
      toId: toId
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update read status:', error);
    throw error;
  }
}

export async function countUnRead(to_id, from_id) {
  try {
    const response = await axios.get(`${API_URL}/chat/howManyUnRead`, {
      params: {
        to_id: to_id,
        from_id: from_id
      }
    })

    return response.data;
  } catch (error) {
    console.error('Failed to count unread messages:', error);
    throw error;
  }
}

export async function isReadMsg(from_id, to_id) {
  try {
    const response = await axios.get(`${API_URL}/chat/getReadStatus`, {
      params: {
        from_id: from_id,
        to_id: to_id
      }
    })

    return response.data;
  } catch (error) {
    console.error('Failed to read message status:', error);
    throw error;
  }
}