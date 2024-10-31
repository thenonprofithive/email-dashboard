import { isValidDashboardFormData } from '../types/api';

/**
 * Fetches email statistics from the Brevo API
 * @param {Object} formData - The dashboard form data
 * @returns {Promise<Object>} - The API response containing email events
 */
export const fetchEmailStats = async (formData) => {
  // Validate form data before making the request
  if (!isValidDashboardFormData(formData)) {
    throw new Error('Invalid form data provided');
  }

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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching email statistics:', error);
    throw error;
  }
};
