import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export const editOrganizer = async ({ id, updateData }: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/api/v1/admin/editOrganizers`, updateData, {
      params: { id },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating organizer:', error);
    throw error;
  }
};
