import axios from 'axios';

export const getBasicData = async (organizerId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8989/api/v1/organizer/get-basic-stats?organizerId=${organizerId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching booking statistics:', error);
    throw error;
  }
};
