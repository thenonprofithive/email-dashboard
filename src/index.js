import './index.css';
import App from './App';

// Remove performance monitoring since it's React-specific
// import reportWebVitals from './reportWebVitals';

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    // Initialize our vanilla JS App class
    new App(rootElement);
  } else {
    console.error('Root element not found');
  }
});
