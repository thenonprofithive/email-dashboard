import './DashboardForm.css';

class DashboardForm {
  constructor(containerId, onSubmit) {
    this.container = document.getElementById(containerId);
    this.onSubmit = onSubmit;
    this.formData = {
      apiKey: '',
      templateId: '',
      startDate: '',
      endDate: new Date().toISOString().split('T')[0] // Today's date
    };
    
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <form class="form">
        <div class="formGroup">
          <label for="apiKey">API Key:</label>
          <input
            type="password"
            id="apiKey"
            name="apiKey"
            value="${this.formData.apiKey}"
            required
          />
        </div>
        
        <div class="formGroup">
          <label for="templateSelect">Select Template: </label>
          <select id="templateSelect" value="${this.formData.templateId}">
            <option value="">Select a template</option>
            <option value="4">Introduction (4)</option>
            <option value="5">Reminder (5)</option>
            <option value="12">Feedback (12)</option>
          </select>
        </div>
        
        <div class="formGroup">
          <label for="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value="${this.formData.startDate}"
            required
          />
        </div>
        
        <div class="formGroup">
          <label for="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value="${this.formData.endDate}"
            required
          />
        </div>

        <button type="submit">Fetch Data</button>
      </form>
    `;
  }

  attachEventListeners() {
    const form = this.container.querySelector('form');
    const inputs = form.querySelectorAll('input');
    const select = form.querySelector('select');

    inputs.forEach(input => {
      input.addEventListener('change', (e) => {
        this.formData[e.target.name] = e.target.value;
      });
    });

    select.addEventListener('change', (e) => {
      this.formData.templateId = e.target.value;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    // Validate form data
    if (!this.validateForm()) {
      return;
    }

    // Call the onSubmit callback with the form data
    this.onSubmit(this.formData);
  }

  validateForm() {
    const { apiKey, startDate, endDate } = this.formData;
    
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
  }

  // Method to reset the form
  reset() {
    this.formData = {
      apiKey: '',
      templateId: '',
      startDate: '',
      endDate: new Date().toISOString().split('T')[0]
    };
    this.render();
  }
}

export default DashboardForm;
