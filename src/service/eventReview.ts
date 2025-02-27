import axios from 'axios';

export const getEventReview = async (eventId: any) => {
  try {
    const response = await axios.get(
      `https://hobi-app-server.onrender.com/api/v1/reviews/filter?eventId=${eventId}`,
    );

    return response.data.result;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
