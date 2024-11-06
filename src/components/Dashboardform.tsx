import React, { FormEvent, ChangeEvent } from 'react';
import './DashboardForm.css';
import { FormData } from '../types/api'

interface DashboardFormProps {
  onSubmit: (data: FormData) => void;
}

// Changed to React.Component class
class DashboardForm extends React.Component<DashboardFormProps, { formData: FormData }> {
  getPreviousMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Calculate days to subtract to get to previous Monday
    let daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    // If today is Monday, go back an additional week
    if (daysToSubtract === 0) {
      daysToSubtract = 7;
    }
    
    const previousMonday = new Date(today);
    previousMonday.setDate(today.getDate() - daysToSubtract);
    return previousMonday.toISOString().split('T')[0];
  };

  constructor(props: DashboardFormProps) {
    super(props);
    this.state = {
      formData: {
        apiKey: '',
        templateId: '4',
        startDate: this.getPreviousMonday(),
        endDate: new Date().toISOString().split('T')[0] // Today's date
      }
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  validateForm = (): boolean => {
    const { apiKey, startDate, endDate } = this.state.formData;
    
    if (!apiKey) {
      alert('Please enter an API key');
      return false;
    }

    if (!startDate) {
      alert('Please select a start date');
      return false;
    }

    if (!endDate) {
      alert('Please select an end date');
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      alert('Start date must be before end date');
      return false;
    }

    return true;
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.validateForm()) {
      return;
    }
    this.props.onSubmit(this.state.formData);
  };

  reset = () => {
    this.setState({
      formData: {
        apiKey: '',
        templateId: '4',
        startDate: this.getPreviousMonday(),
        endDate: new Date().toISOString().split('T')[0]
      }
    });
  };

  render() {
    const { formData } = this.state;
    
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="formGroup">
          <label htmlFor="apiKey">API Key:</label>
          <input
            type="password"
            id="apiKey"
            name="apiKey"
            value={formData.apiKey}
            onChange={this.handleInputChange}
            required
          />
        </div>
        
        <div className="formGroup">
          <label htmlFor="templateSelect">Select Template: </label>
          <select 
            id="templateSelect"
            name="templateId"
            value={formData.templateId}
            onChange={this.handleInputChange}
          >
            <option value="">Select a template</option>
            <option value="4">Introduction (4)</option>
            <option value="5">Reminder (5)</option>
            <option value="12">Feedback (12)</option>
          </select>
        </div>
        
        <div className="formGroup">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={this.handleInputChange}
            required
          />
        </div>
        
        <div className="formGroup">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <button type="submit">Fetch Data</button>
      </form>
    );
  }
}

export default DashboardForm; 
