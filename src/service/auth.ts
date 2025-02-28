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
