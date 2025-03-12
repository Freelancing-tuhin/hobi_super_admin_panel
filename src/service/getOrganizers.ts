import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export const getOrganizers = async ({ filter }: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/admin/getAllOrganizers`, {
      params: filter,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getOrganizerById = async (id: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/admin/getOrganizerById`, {
      params: { id },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching organizer:', error);
    throw error;
  }
};
