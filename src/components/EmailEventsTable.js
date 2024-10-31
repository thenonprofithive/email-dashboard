import './EmailEventsTable.css';

const getEventStatusColor = (event) => {
  const statusClasses = {
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

class EmailEventsTable {
  constructor(containerId, events) {
    this.container = document.getElementById(containerId);
    this.events = events;
    this.selectedTemplateId = null;
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  processEmails() {
    const emailMap = new Map();

    this.events.forEach((event) => {
      if (!emailMap.has(event.email)) {
        emailMap.set(event.email, {
          email: event.email,
          subject: event.subject,
          events: []
        });
      }

      const emailSummary = emailMap.get(event.email);
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
  }

  formatEventSummary(event) {
    const dates = event.dates
      .sort((a, b) => b.getTime() - a.getTime())
      .map(date => date.toLocaleString())
      .join(', ');
    
    return `
      <div class="${getEventStatusColor(event.event)}">
        ${event.event} (${event.dates.length})
        <div class="datesList">
          ${dates}
        </div>
      </div>
    `;
  }

  createDropdown() {
    return `
      <div class="dropdownContainer">
        <label for="templateSelect">Select Template: </label>
        <select id="templateSelect">
          <option value="">Select a template</option>
          <option value="4">Introduction (4)</option>
          <option value="5">Reminder (5)</option>
          <option value="12">Feedback (12)</option>
        </select>
      </div>
    `;
  }

  createTable() {
    const processedEmails = this.processEmails();
    
    return `
      <table class="email-events-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Subject</th>
            <th>Events</th>
          </tr>
        </thead>
        <tbody>
          ${processedEmails.map(emailSummary => `
            <tr>
              <td>${emailSummary.email}</td>
              <td>${emailSummary.subject}</td>
              <td>
                ${emailSummary.events.map((event, index) => `
                  ${this.formatEventSummary(event)}
                  ${index < emailSummary.events.length - 1 ? '<hr>' : ''}
                `).join('')}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  render() {
    this.container.innerHTML = `
      <div class="tableContainer">
        ${this.createDropdown()}
        ${this.createTable()}
      </div>
    `;
  }

  attachEventListeners() {
    const templateSelect = this.container.querySelector('#templateSelect');
    templateSelect.addEventListener('change', (event) => {
      this.selectedTemplateId = Number(event.target.value);
      // Add any filtering logic here based on selectedTemplateId
    });
  }

  // Method to update the table with new data
  updateEvents(newEvents) {
    this.events = newEvents;
    this.render();
  }
}

// Usage example:
// const emailEventsTable = new EmailEventsTable('container-id', eventsData);
export default EmailEventsTable;
