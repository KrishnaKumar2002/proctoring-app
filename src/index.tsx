import ReactDOM from 'react-dom/client';
import './core/index.css';
import App from './core/App';
import reportWebVitals from './core/reportWebVitals';
import ThemeProvider from './core/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

reportWebVitals();
