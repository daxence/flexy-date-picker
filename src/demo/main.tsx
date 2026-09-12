import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Demo } from './demo';
import '../shared/styles/index.css';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
);
