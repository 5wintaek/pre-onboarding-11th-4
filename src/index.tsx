/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// eslint-disable-next-line no-unused-vars
import { SickProvider } from '@/context/SickContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // eslint-disable-next-line react/no-unknown-property
  <SickProvider>
    <App />
  </SickProvider>
);
