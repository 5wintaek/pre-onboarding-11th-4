/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// eslint-disable-next-line no-unused-vars
import { sickServiceProvider } from '@/context/SickContext';
import axiosClient from '@/Client/axiosClient';
import { SickService } from '@/api/sickService';

const baseURL = 'http://localhost:4000/';
const sickService = new SickService(axiosClient(baseURL));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // eslint-disable-next-line react/no-unknown-property
  <sickServiceProvider sickService={sickService}>
    <App />
  </sickServiceProvider>
);
