import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export const createServiceAPi = async ({ serviceName, description }: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/services/create`,
      {
        service_name: serviceName,
        description: description,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};
