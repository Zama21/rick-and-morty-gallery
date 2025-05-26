import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { colors } from 'theme';
import { DataProvider, PopupProvider } from 'components';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={{ colors }}>
      <DataProvider>
        <PopupProvider>
          <App />
        </PopupProvider>
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>
);
