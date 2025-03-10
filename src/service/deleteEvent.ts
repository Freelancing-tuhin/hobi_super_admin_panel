import axios from 'axios';

const API_BASE_URL = 'https://hobi-app-server.onrender.com/api/v1/events';

export const deleteEvent = async (eventId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/delete-event`, {
      params: { eventId },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
