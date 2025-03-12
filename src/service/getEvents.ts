import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export const getEvent = async ({ filter }: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/events/get-events`, {
      params: filter,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
