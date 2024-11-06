import React from 'react';
import './EmailEventsTable.css';
import { EmailEvent, EmailEventType } from '../types/api';
import { StatusColorType, EmailSummary, EventSummary } from '../types/components';

const getEventStatusColor = (event: EmailEventType): StatusColorType => {
  const statusClasses: Record<EmailEventType, StatusColorType> = {
    delivered: 'success',
    opened: 'success',
    clicks: 'success',
    bounces: 'error',
    hardBounces: 'error',
    softBounces: 'error',
    error: 'error',
    spam: 'warning',
    blocked: 'warning',
    invalid: 'warning',
    requests: 'info',
    deferred: 'warning',
    unsubscribed: 'warning',
    loadedByProxy: 'info'
  };
  return statusClasses[event] || 'info';
};

interface EmailEventsTableProps {
  events: EmailEvent[];
}

const EmailEventsTable: React.FC<EmailEventsTableProps> = ({ events }) => {

  const processEmails = (): EmailSummary[] => {
    const emailMap = new Map<string, EmailSummary>();

    events.forEach((event) => {
      if (!emailMap.has(event.email)) {
        emailMap.set(event.email, {
          email: event.email,
          subject: event.subject,
          events: []
        });
      }

      const emailSummary = emailMap.get(event.email)!;
      const existingEvent = emailSummary.events.find((e: EventSummary) => e.event === event.event);

      if (existingEvent) {
        existingEvent.dates.push(new Date(event.date));
      } else {
        emailSummary.events.push({
          event: event.event,
          dates: [new Date(event.date)]
        });
      }
    });

    return Array.from(emailMap.values());
  };

  const EventSummaryComponent: React.FC<{ event: EventSummary }> = ({ event }) => {
    const dates = event.dates
      .sort((a: Date, b: Date) => b.getTime() - a.getTime())
      .map((date: Date) => date.toLocaleString())
      .join(', ');

    return (
      <div className={getEventStatusColor(event.event)}>
        {event.event} ({event.dates.length})
        <div className="datesList">
          {dates}
        </div>
      </div>
    );
  };

  const processedEmails = processEmails();

  return (
    <div className="tableContainer">
      <table className="email-events-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Subject</th>
            <th>Events</th>
          </tr>
        </thead>
        <tbody>
          {processedEmails.map((emailSummary) => (
            <tr key={emailSummary.email}>
              <td>{emailSummary.email}</td>
              <td>{emailSummary.subject}</td>
              <td>
                {emailSummary.events.map((event: EventSummary, index: number) => (
                  <React.Fragment key={event.event}>
                    <EventSummaryComponent event={event} />
                    {index < emailSummary.events.length - 1 && <hr />}
                  </React.Fragment>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailEventsTable; 
