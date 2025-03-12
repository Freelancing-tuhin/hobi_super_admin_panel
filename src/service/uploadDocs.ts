import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';

const API_BASE_URL1 = `${API_BASE_URL}/api/v1/organizer`; // Change if needed

export const uploadOrganizerDocuments = async (
  organizerId: string,
  files: Record<string, File | null>,
) => {
  try {
    const formData = new FormData();

    // Append each file if it's not null
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key] as File);
      }
    });

    const response = await axios.patch(
      `${API_BASE_URL1}/update_documents?organizerId=${organizerId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error uploading documents:', error);
    throw error;
  }
};
