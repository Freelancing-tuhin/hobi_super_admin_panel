import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

const API_BASE_URL1 = `${API_BASE_URL}/api/v1/events`;

export const editEvent = async (eventId: string, updatedData: object) => {
  try {
    const response = await axios.patch(`${API_BASE_URL1}/edit-event`, updatedData, {
      params: { eventId },
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};
