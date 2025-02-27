import axios from 'axios';

const API_BASE_URL = 'https://hobi-app-server.onrender.com/api/v1/events';

export const editEvent = async (eventId: string, updatedData: object) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/edit-event`, updatedData, {
      params: { eventId },
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};
