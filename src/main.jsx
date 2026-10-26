import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { getSnippet, injectSnippet } from './widget';
import './styles.css';

// Load saved widget once on boot; it persists across SPA route changes.
injectSnippet(getSnippet());

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter><App /></BrowserRouter>
);
