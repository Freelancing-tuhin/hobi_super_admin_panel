import axios from 'axios';

export const getEvent = async ({ filter }: any) => {
  try {
    const response = await axios.get('http://localhost:8989/api/v1/events/get-events', {
      params: filter,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
