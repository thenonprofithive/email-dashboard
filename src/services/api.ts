import { EmailEventData, EmailEvent, EmailInfo } from '../types/api';

// curl --request GET \
//      --url 'https://api.brevo.com/v3/smtp/statistics/events?limit=2500&offset=0&startDate=2024-11-20&endDate=2024-11-24&templateId=4&sort=desc' \
//      --header 'accept: application/json' \
//      --header 'api-key: abc123'
export const fetchEmailEvents = async (
  params: EmailEventData
): Promise<EmailEvent[]> => {
  const { apiKey, templateId, startDate, endDate } = params;

  if (!apiKey) {
    throw new Error('API key is required');
  }

  const url = `https://api.brevo.com/v3/smtp/statistics/events?limit=2500&offset=0&startDate=${startDate}&endDate=${endDate}&templateId=${templateId}&sort=desc`;
  console.log(url);
  console.log(apiKey);
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

    // {
    //   "events": [
    //     {
    //       "email": "andrew@embracerace.org",
    //       "date": "2024-11-23T21:50:12.669-05:00",
    //       "subject": "This Week's Hive Chat Introduction",
    //       "messageId": "<202411190127.58252151457@smtp-relay.mailin.fr>",
    //       "event": "opened",
    //       "tag": "",
    //       "ip": "66.102.8.99",
    //       "from": "tasha@thenonprofithive.com",
    //       "templateId": 4
    //     }
    //   ]
    // }
    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error('Error fetching email statistics:', error);
    throw error;
  }
};

// curl --request GET \
//      --url 'https://api.brevo.com/v3/smtp/emails?messageId=%3C202411190127.58252151457%40smtp-relay.mailin.fr%3E&sort=desc&limit=500&offset=0' \
//      --header 'accept: application/json' \
//      --header 'api-key: abc123'
export const fetchEmailInfo = async (
  params: EmailInfo
): Promise<EmailInfo[]> => {
  const { apiKey, messageId } = params;
  if (!apiKey) {
    throw new Error('API key is required');
  }
  const url = `https://api.brevo.com/v3/smtp/emails?messageId=${messageId}&sort=desc&limit=500&offset=0`;
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
    // {
    //   "count": 1,
    //   "transactionalEmails": [
    //     {
    //       "email": "andrew@embracerace.org",
    //       "subject": "This Week's Hive Chat Introduction",
    //       "messageId": "<202411190127.58252151457@smtp-relay.mailin.fr>",
    //       "uuid": "f932dee0-f8b6-4744-986c-3148fb6cc0f0",
    //       "date": "2024-11-18T20:27:47.022-05:00",
    //       "templateId": 4,
    //       "from": "tasha@thenonprofithive.com",
    //       "tags": []
    //     }
    //   ]
    // }
    return data.transactionalEmails;
  } catch (error) {
    console.error('Error fetching email statistics:', error);
    throw error;
  }
};
