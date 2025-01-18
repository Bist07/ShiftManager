import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Schedule, Employee } from './pages';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides consistent baseline styling */}
      <CssBaseline />
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/Employee" element={<Employee />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
