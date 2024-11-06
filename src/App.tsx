import { useState } from 'react';
import DashboardForm from './components/Dashboardform';
import EmailEventsTable from './components/EmailEventsTable';
import { EmailEvent } from './types/api';
import { fetchEmailEvents } from './services/api';
import './App.css';
import { FormData } from './types/api'

const App = () => {
  const [emailData, setEmailData] = useState<EmailEvent[] | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = await fetchEmailEvents(formData);
      setEmailData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Email Dashboard</h1>
      </header>
      <main>
        <DashboardForm onSubmit={handleSubmit} />
        {emailData && <EmailEventsTable events={emailData} />}
      </main>
    </div>
  );
};

export default App;
