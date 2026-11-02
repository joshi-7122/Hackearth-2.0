import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/abril-fatface/latin-400.css';
import '@fontsource-variable/source-serif-4/opsz.css';
import '@fontsource-variable/jetbrains-mono';
import './index.css';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
