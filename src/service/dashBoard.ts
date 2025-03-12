import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export const getBasicData = async (organizerId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/organizer/get-basic-stats?organizerId=${organizerId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching booking statistics:', error);
    throw error;
  }
};
