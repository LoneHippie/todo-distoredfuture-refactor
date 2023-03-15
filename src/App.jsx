import './App.css';
import AppRouter from './contexts/router/AppRouter';
import AppThemeProvider from './contexts/theme/AppThemeProvider';
import React from 'react';

function App() {
   return (
      <AppThemeProvider>
         <AppRouter />
      </AppThemeProvider>
   );
}

export default App;
