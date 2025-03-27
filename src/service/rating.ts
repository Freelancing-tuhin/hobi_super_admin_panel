import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export const getAdminReviews = async (rating: any, page = 1, limit = 10) => {
  try {
    const params: any = {
      review_status: 'Admin',
      page,
      limit,
    };

    if (rating > 0) {
      params.rating = rating;
    }

    const response = await axios.get(`${API_BASE_URL}/api/v1/reviews/filter`, { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    throw error;
  }
};
