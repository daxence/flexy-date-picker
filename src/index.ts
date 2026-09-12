// Styles are bundled into dist/style.css during the library build.
// Consumers must import them explicitly — pick one approach:
//   import 'flexy-date-picker/styles';          ← recommended (uses package exports)
//   import 'flexy-date-picker/dist/style.css';  ← direct path fallback

export * from './features/date-picker';
export * from './features/time-picker';

// CSS — tells Vite to include this file in the library's style.css output
import './shared/styles/index.css';
