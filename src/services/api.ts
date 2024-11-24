import {
  EmailEventApiData,
  EmailEventResponse,
  EmailInfoApiData,
  EmailInfoResponse,
} from '../types/api';

// curl --request GET \
//      --url 'https://api.brevo.com/v3/smtp/statistics/events?limit=2500&offset=0&startDate=2024-11-20&endDate=2024-11-24&templateId=4&sort=desc' \
//      --header 'accept: application/json' \
//      --header 'api-key: abc123'
export const fetchEmailEvents = async (
  params: EmailEventApiData
): Promise<EmailEventResponse[]> => {
  const { apiKey, templateId, startDate, endDate } = params;

  if (!apiKey) {
    throw new Error('API key is required');
  }

  const limitMax = 2500;
  let offset = 0;
  let allEvents: EmailEventResponse[] = [];

  let hasMoreData = true;
  while (hasMoreData) {
    const url = `https://api.brevo.com/v3/smtp/statistics/events?limit=${limitMax}&offset=${offset}&startDate=${startDate}&endDate=${endDate}&templateId=${templateId}&sort=desc`;
    console.log(`Fetching events with offset: ${offset}`);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
          accept: 'application/json',
          'api-key': apiKey,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch email statistics: ${errorText}`);
      }

      const data = await response.json();
      const events = data.events;

      // If no events returned or less than limit, we've reached the end
      if (!events || events.length === 0) {
        hasMoreData = false;
        break;
      }

      allEvents = [...allEvents, ...events];

      // If we got fewer events than the limit, we've reached the end
      if (events.length < limitMax) {
        hasMoreData = false;
      } else {
        offset += limitMax;
      }
    } catch (error) {
      console.error('Error fetching email statistics:', error);
      throw error;
    }
  }

  return allEvents;
};

// curl --request GET \
//      --url 'https://api.brevo.com/v3/smtp/emails?messageId=%3C202411190127.58252151457%40smtp-relay.mailin.fr%3E&sort=desc&limit=500&offset=0' \
//      --header 'accept: application/json' \
//      --header 'api-key: abc123'
export const fetchEmailInfo = async (
  params: EmailInfoApiData
): Promise<EmailInfoResponse[]> => {
  const { apiKey, templateId, startDate, endDate } = params;
  if (!apiKey) {
    throw new Error('API key is required');
  }

  const limitMax = 1000;
  let offset = 0;
  let allEmails: EmailInfoResponse[] = [];
  let hasMoreData = true;
  while (hasMoreData) {
    const url = `https://api.brevo.com/v3/smtp/emails?limit=${limitMax}&offset=${offset}&startDate=${startDate}&endDate=${endDate}&templateId=${templateId}&sort=desc`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
          accept: 'application/json',
          'api-key': apiKey,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch email statistics: ${errorText}`);
      }

      const data = await response.json();
      const emails = data.transactionalEmails;

      // If no events returned or less than limit, we've reached the end
      if (!emails || emails.length === 0) {
        hasMoreData = false;
        break;
      }

      allEmails = [...allEmails, ...emails];

      // If we got fewer emails than the limit, we've reached the end
      if (emails.length < limitMax) {
        hasMoreData = false;
      } else {
        offset += limitMax;
      }
    } catch (error) {
      console.error('Error fetching email statistics:', error);
      throw error;
    }
  }

  return allEmails;
};
