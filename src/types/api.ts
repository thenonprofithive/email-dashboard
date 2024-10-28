export interface EmailEvent {
  email: string;
  date: string;
  subject: string;
  messageId: string;
  event: 'bounces' | 'hardBounces' | 'softBounces' | 'delivered' | 'spam' | 
         'requests' | 'opened' | 'clicks' | 'invalid' | 'deferred' | 'blocked' | 
         'unsubscribed' | 'error' | 'loadedByProxy';
  tag: string;
  ip: string;
  from: string;
  templateId: number;
  link?: string; // Optional because it only appears for 'clicks' events
}

export interface ApiResponse {
  events: EmailEvent[];
}

export interface DashboardFormData {
  apiKey: string;
  templateId: string;
  startDate: string;
  endDate: string;
}
