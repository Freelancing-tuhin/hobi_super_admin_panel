import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export const getAllUsers = async ({ search = '', page = 1, limit = 10 }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/admin/getAllUsers`, {
      params: { search, page, limit },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
