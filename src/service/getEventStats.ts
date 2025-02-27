import axios from 'axios';

const getBookingStatistics = async (eventId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8989/api/v1/events/view-event-stats?eventId=${eventId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching booking statistics:', error);
    throw error;
  }
};

export default getBookingStatistics;

export const getBookingUsers = async (eventId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8989/api/v1/events/view-event-users?eventId=${eventId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching booking statistics:', error);
    throw error;
  }
};

export const getBookingPerformance = async (eventId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8989/api/v1/events/view-event-performance?eventId=${eventId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching booking statistics:', error);
    throw error;
  }
};
