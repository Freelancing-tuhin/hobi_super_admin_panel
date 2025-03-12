import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export const getEventReview = async (eventId: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/reviews/filter?eventId=${eventId}`);

    return response.data.result;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
