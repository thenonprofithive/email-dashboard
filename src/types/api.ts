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

export interface EmailEvent {
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
}

export interface FormData {
  startDate: string;
  endDate: string;
  templateId?: string;
  limit?: number;
  offset?: number;
  sort?: 'desc' | 'asc';
  apiKey?: string;
}

export interface DashboardFormProps {
  onDataFetch: (data: EmailEvent[]) => void;
}

export interface EmailEventsTableProps {
  data: EmailEvent[];
}
