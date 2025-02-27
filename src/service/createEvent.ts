import axios from 'axios';

export interface CreateEventPayload {
  title: string;
  category: string;
  type: string;
  startDate: string;
  startTime: string;
  endTime: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  description: string;
  bannerImage: File;
  isTicketed: boolean;
  ticketName?: string;
  ticketPrice?: number;
  organizerId: string;
}

export const createEvent = async (eventData: CreateEventPayload): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append('title', eventData.title);
    formData.append('category', eventData.category);
    formData.append('type', eventData.type);
    formData.append('startDate', eventData.startDate);
    formData.append('startTime', eventData.startTime);
    formData.append('endTime', eventData.endTime);

    formData.append('location[address]', eventData?.location?.address);
    formData.append('location[latitude]', String(eventData.location.latitude));
    formData.append('location[longitude]', String(eventData.location.longitude));

    formData.append('description', eventData.description);
    formData.append('banner_Image', eventData.bannerImage);
    formData.append('isTicketed', String(eventData.isTicketed));

    if (eventData.isTicketed) {
      formData.append('ticketName', eventData.ticketName || '');
      formData.append('ticketPrice', eventData.ticketPrice?.toString() || '0');
    }

    formData.append('organizerId', eventData.organizerId);

    const response = await axios.post(
      'https://hobi-app-server.onrender.com/api/v1/events/create-event',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log('Event created successfully:', response.data);
  } catch (error) {
    console.error('Error creating event:', error);
  }
};
