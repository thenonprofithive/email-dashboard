import { EmailEvent } from '../types/api';

interface FetchEmailEventsParams {
  apiKey: string;
  templateId: string;
  startDate: string;
  endDate: string;
}

export const fetchEmailEvents = async (
  params: FetchEmailEventsParams
): Promise<EmailEvent[]> => {
  const { apiKey, templateId, startDate, endDate } = params;

  const url = `https://api.brevo.com/v3/smtp/statistics/events?limit=2500&offset=0&startDate=${startDate}&endDate=${endDate}&templateId=${templateId}&sort=desc`;
  console.log(url);
  console.log(apiKey);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch email statistics: ${errorText}`);
    }

    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error('Error fetching email statistics:', error);
    throw error;
  }
};
