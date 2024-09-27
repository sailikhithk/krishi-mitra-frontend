import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add this at the top of your main entry file
(window as any).process = {
  env: {
    NODE_ENV: import.meta.env.MODE,
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
