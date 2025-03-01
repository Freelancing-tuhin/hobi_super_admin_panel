import axios from 'axios';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export const loginOrganizer = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      'http://localhost:8989/api/v1/auth/organizer-login',
      {
        email,
        password,
      },
    );

    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const API_BASE_URL = 'http://localhost:8989/api/v1/auth';

export interface OrganizerSignupData {
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

export const organizerSignup = async (data: OrganizerSignupData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/organizer-signup`, data);
    return response.data; // Returns the API response data
  } catch (error: any) {
    throw error.response?.data || 'Signup failed'; // Throws error if signup fails
  }
};

export const updateOrganizerProfile = async (organizerId: string, profileData: any) => {
  try {
    const response = await axios.patch(
      `http://localhost:8989/api/v1/organizer/update_profile`,
      profileData,
      {
        params: { organizerId },
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error updating organizer profile:', error);
    throw error;
  }
};
