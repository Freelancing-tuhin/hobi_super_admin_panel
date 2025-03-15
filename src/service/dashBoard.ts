import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export const getBasicData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/admin/dashboard-stats`);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching booking statistics:', error);
    throw error;
  }
};
