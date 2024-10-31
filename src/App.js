import { fetchEmailStats } from './services/api';
import './App.css';

class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.emailEvents = [];
    this.error = '';
    
    // Create references to DOM elements
    this.formContainer = null;
    this.tableContainer = null;
    this.formInstance = null;
    this.tableInstance = null;
    this.errorElement = null;
    this.resultsContainer = null;

    this.initialize();
  }

  initialize() {
    // Create main structure
    this.rootElement.innerHTML = `
      <div class="App">
        <h1>Email Dashboard</h1>
        <div id="dashboard-form-container"></div>
        <div id="error-container" class="error" style="display: none;"></div>
        <div id="results-container" class="results" style="display: none;">
          <h2>Results</h2>
          <p id="results-count"></p>
          <div id="email-events-table-container"></div>
        </div>
      </div>
    `;

    // Store references to DOM elements
    this.formContainer = document.getElementById('dashboard-form-container');
    this.tableContainer = document.getElementById('email-events-table-container');
    this.errorElement = document.getElementById('error-container');
    this.resultsContainer = document.getElementById('results-container');
    this.resultsCount = document.getElementById('results-count');

    // Initialize form
    if (this.formContainer) {
      this.formInstance = new DashboardForm(
        'dashboard-form-container',
        this.handleSubmit.bind(this)
      );
    }
  }

  setError(errorMessage) {
    this.error = errorMessage;
    if (errorMessage) {
      this.errorElement.textContent = errorMessage;
      this.errorElement.style.display = 'block';
    } else {
      this.errorElement.style.display = 'none';
    }
  }

  updateEmailEvents(events) {
    this.emailEvents = events;
    
    if (events.length > 0) {
      // Update results display
      this.resultsContainer.style.display = 'block';
      this.resultsCount.textContent = `Found ${events.length} events`;

      // Initialize or update table
      if (this.tableInstance) {
        this.tableInstance.updateEvents(events);
      } else {
        this.tableInstance = new EmailEventsTable(
          'email-events-table-container',
          events
        );
      }
    } else {
      this.resultsContainer.style.display = 'none';
    }
  }

  async handleSubmit(formData) {
    try {
      this.setError('');
      const response = await fetchEmailStats(formData);
      this.updateEmailEvents(response.events);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    new App(rootElement);
  }
});

export default App;
