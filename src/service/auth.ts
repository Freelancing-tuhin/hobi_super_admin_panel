import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export const loginAdmin = async (phone: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/admin-login`, {
      phone,
    });

    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const getOtp = async (phone: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/get-otp`, {
      phone,
    });

    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
