import React, { useState } from 'react';
import './EmailEventsTable.css';
import '../types/api'


const getEventStatusColor = (event: EventType): StatusColorType => {
  const statusClasses: Record<EventType, StatusColorType> = {
    delivered: 'success',
    opened: 'success',
    clicks: 'success',
    bounces: 'error',
    hardBounces: 'error',
    softBounces: 'error',
    error: 'error',
    spam: 'warning',
    blocked: 'warning',
    invalid: 'warning'
  };
  return statusClasses[event] || 'info';
};

interface EmailEventsTableProps {
  events: EmailEvent[];
  onTemplateChange?: (templateId: number | null) => void;
}

const EmailEventsTable: React.FC<EmailEventsTableProps> = ({ events, onTemplateChange }) => {

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
      const existingEvent = emailSummary.events.find(e => e.event === event.event);

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
      .sort((a, b) => b.getTime() - a.getTime())
      .map(date => date.toLocaleString())
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

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setSelectedTemplateId(value);
    onTemplateChange?.(value);
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
                {emailSummary.events.map((event, index) => (
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
