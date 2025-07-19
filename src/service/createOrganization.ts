// src/api/auth.ts

import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

export interface OrganizerSignupPayload {
  full_name: string;
  age: number;
  phone: string;
  email: string;
  gender: string;
  address: string;
  password: string;
  profile_pic: string;
  service_category: string;
}

export const signupOrganizer = async (data: OrganizerSignupPayload): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/organizer-signup`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Signup failed:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
