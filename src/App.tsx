import React, { useState } from 'react';
import DashboardForm from './components/DashboardForm';
import EmailEventsTable from './components/EmailEventsTable';
import { DashboardFormData, EmailEvent } from './types/api';
import { fetchEmailStats } from './services/api';
import './App.css';

const App: React.FC = () => {
  const [emailEvents, setEmailEvents] = useState<EmailEvent[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (formData: DashboardFormData) => {
    try {
      setError('');
      const response = await fetchEmailStats(formData);
      setEmailEvents(response.events);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="App">
      <h1>Email Dashboard</h1>
      <DashboardForm onSubmit={handleSubmit} />
      
      {error && <div className="error">{error}</div>}
      
      {emailEvents.length > 0 && (
        <div className="results">
          <h2>Results</h2>
          <p>Found {emailEvents.length} events</p>
          <EmailEventsTable events={emailEvents} />
        </div>
      )}
    </div>
  );
};

export default App;
