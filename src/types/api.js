// Constants for valid email event types
const EMAIL_EVENTS = {
  BOUNCES: 'bounces',
  HARD_BOUNCES: 'hardBounces',
  SOFT_BOUNCES: 'softBounces',
  DELIVERED: 'delivered',
  SPAM: 'spam',
  REQUESTS: 'requests',
  OPENED: 'opened',
  CLICKS: 'clicks',
  INVALID: 'invalid',
  DEFERRED: 'deferred',
  BLOCKED: 'blocked',
  UNSUBSCRIBED: 'unsubscribed',
  ERROR: 'error',
  LOADED_BY_PROXY: 'loadedByProxy'
};

/**
 * Validates an email event object
 * @param {Object} event - The email event to validate
 * @returns {boolean} - Whether the event is valid
 */
function isValidEmailEvent(event) {
  return (
    typeof event === 'object' &&
    typeof event.email === 'string' &&
    typeof event.date === 'string' &&
    typeof event.subject === 'string' &&
    typeof event.messageId === 'string' &&
    Object.values(EMAIL_EVENTS).includes(event.event) &&
    typeof event.tag === 'string' &&
    typeof event.ip === 'string' &&
    typeof event.from === 'string' &&
    typeof event.templateId === 'number' &&
    (event.link === undefined || typeof event.link === 'string')
  );
}

/**
 * Validates dashboard form data
 * @param {Object} formData - The form data to validate
 * @returns {boolean} - Whether the form data is valid
 */
function isValidDashboardFormData(formData) {
  return (
    typeof formData === 'object' &&
    typeof formData.apiKey === 'string' &&
    typeof formData.templateId === 'string' &&
    typeof formData.startDate === 'string' &&
    typeof formData.endDate === 'string'
  );
}

module.exports = {
  EMAIL_EVENTS,
  isValidEmailEvent,
  isValidDashboardFormData
};
