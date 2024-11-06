import { EmailEventType } from '../types/api';

export type StatusColorType = 'success' | 'error' | 'warning' | 'info';

export interface EmailSummary {
  email: string;
  subject: string;
  events: EventSummary[];
}

export interface EventSummary {
  event: EmailEventType;
  dates: Date[];
} 
