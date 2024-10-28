import React, { useMemo, useState } from 'react';
import { EmailEvent } from '../types/api';
import styles from './EmailEventsTable.module.css';

interface EmailEventsTableProps {
  events: EmailEvent[];
}

interface AggregatedEvent {
  event: EmailEvent['event'];
  dates: Date[];
}

interface EmailSummary {
  email: string;
  subject: string;
  events: AggregatedEvent[];
}

const getEventStatusColor = (event: EmailEvent['event']): string => {
  switch (event) {
    case 'delivered':
    case 'opened':
    case 'clicks':
      return styles.success;
    case 'bounces':
    case 'hardBounces':
    case 'softBounces':
    case 'error':
      return styles.error;
    case 'spam':
    case 'blocked':
    case 'invalid':
      return styles.warning;
    default:
      return styles.info;
  }
};

const EmailEventsTable: React.FC<EmailEventsTableProps> = ({ events }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

  const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplateId(Number(event.target.value));
  };

  const processedEmails = useMemo(() => {
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
  }, [events]);

  const formatEventSummary = (event: AggregatedEvent) => {
    const dates = event.dates
      .sort((a, b) => b.getTime() - a.getTime())
      .map(date => date.toLocaleString())
      .join(', ');
    
    return (
      <div className={getEventStatusColor(event.event)}>
        {event.event} ({event.dates.length})
        <div className={styles.datesList}>
          {dates}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.dropdownContainer}>
        <label htmlFor="templateSelect">Select Template: </label>
        <select id="templateSelect" onChange={handleTemplateChange}>
          <option value="">Select a template</option>
          <option value="4">Introduction (4)</option>
          <option value="5">Reminder (5)</option>
          <option value="12">Feedback (12)</option>
        </select>
      </div>
      <table className={styles.table}>
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
                    {formatEventSummary(event)}
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
