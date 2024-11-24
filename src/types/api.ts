export enum EmailEventType {
  BOUNCES = 'bounces',
  HARD_BOUNCES = 'hardBounces',
  SOFT_BOUNCES = 'softBounces',
  DELIVERED = 'delivered',
  SPAM = 'spam',
  REQUESTS = 'requests',
  OPENED = 'opened',
  CLICKS = 'clicks',
  INVALID = 'invalid',
  DEFERRED = 'deferred',
  BLOCKED = 'blocked',
  UNSUBSCRIBED = 'unsubscribed',
  ERROR = 'error',
  LOADED_BY_PROXY = 'loadedByProxy',
}

export interface EmailEventResponse {
  id?: string;
  email: string;
  date: string;
  subject: string;
  messageId: string;
  event: EmailEventType;
  tag: string;
  ip: string;
  from: string;
  templateId?: number;
  dateSent?: string;
}

export interface EmailEventApiData {
  startDate: string;
  endDate: string;
  templateId?: string;
  apiKey?: string;
}

export interface EmailInfoApiData {
  startDate: string;
  endDate: string;
  templateId?: string;
  apiKey?: string;
}

export interface EmailInfoResponse {
  email?: string;
  subject?: string;
  messageId?: string;
  uuid?: string;
  date?: string;
  templateId?: number;
  from?: string;
  tags?: string[];
}

export interface DashboardFormProps {
  onDataFetch: (data: EmailEventResponse[]) => void;
}

export interface EmailEventsTableProps {
  data: EmailEventResponse[];
}
