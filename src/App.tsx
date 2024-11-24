import { useState } from 'react';
import DashboardForm from './components/Dashboardform';
import EmailEventsTable from './components/EmailEventsTable';
import { EmailEventResponse, EmailEventApiData} from './types/api';
import { fetchEmailEvents, fetchEmailInfo } from './services/api';
import './App.css';

const App = () => {
  const [emailData, setEmailData] = useState<EmailEventResponse[] | null>(null);

  const handleSubmit = async (formData: EmailEventApiData) => {
    try {
      const emailEventsData = await fetchEmailEvents(formData);
      const emailInfoData = await fetchEmailInfo(formData);
      //emailEventsData is an array of all of the email events. However we only want email events associated with emails that were sent between the start date and the end date. We need to loop throught the array of emailEventsData, and then loop through the array of emailInfoData to find the email events that correspond with the emailInfoData.
      const emailEventsDataWithInfo: EmailEventResponse[] = [];
      for (const emailEvent of emailEventsData) {      
        for (const emailInfo of emailInfoData) {
          if (emailEvent.messageId === emailInfo.messageId) {
            if (emailInfo.date) {
              if (emailInfo.date >= formData.startDate && emailInfo.date <= formData.endDate) {
                emailEvent.dateSent = emailInfo.date;
                emailEventsDataWithInfo.push(emailEvent);
              }
            }
          }
        }
      }
      setEmailData(emailEventsDataWithInfo);
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
