import axios from 'axios';

export const editOrganizer = async ({ id, updateData }: any) => {
  try {
    const response = await axios.patch(
      'http://localhost:8989/api/v1/admin/editOrganizers',
      updateData,
      {
        params: { id },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error updating organizer:', error);
    throw error;
  }
};
