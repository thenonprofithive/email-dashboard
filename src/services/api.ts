import { ApiResponse, DashboardFormData } from '../types/api';

export const fetchEmailStats = async (formData: DashboardFormData): Promise<ApiResponse> => {
  const { apiKey, templateId, startDate, endDate } = formData;
  
  const url = `https://api.brevo.com/v3/smtp/statistics/events?limit=2500&offset=0&startDate=${startDate}&endDate=${endDate}&templateId=${templateId}&sort=desc`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch email statistics: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching email statistics:', error);
    throw error;
  }
};
