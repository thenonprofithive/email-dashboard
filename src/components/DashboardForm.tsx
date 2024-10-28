import React, { useState } from 'react';
import { DashboardFormData } from '../types/api';
import styles from './DashboardForm.module.css';

interface DashboardFormProps {
  onSubmit: (data: DashboardFormData) => void;
}

const DashboardForm: React.FC<DashboardFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DashboardFormData>({
    apiKey: '',
    templateId: '',
    startDate: '',
    endDate: new Date().toISOString().split('T')[0], // Set initial value to today's date
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, templateId: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="password"
          id="apiKey"
          name="apiKey"
          value={formData.apiKey}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="templateSelect">Select Template: </label>
        <select id="templateSelect" value={formData.templateId ?? ''} onChange={handleSelectChange}>
          <option value="">Select a template</option>
          <option value="4">Introduction (4)</option>
          <option value="5">Reminder (5)</option>
          <option value="12">Feedback (12)</option>
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate} // Use value instead of defaultValue
          onChange={handleInputChange} // Ensure changes are captured
          required
        />
      </div>

      <button type="submit">Fetch Data</button>
    </form>
  );
};

export default DashboardForm;
