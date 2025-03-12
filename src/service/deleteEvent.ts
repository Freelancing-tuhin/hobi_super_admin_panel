import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

const API_BASE_URL1 = `${API_BASE_URL}/api/v1/events`;

export const deleteEvent = async (eventId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL1}/delete-event`, {
      params: { eventId },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
