import React from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Schedule, Employee } from './pages';
import { CssBaseline } from '@mui/material';
import ThemeModeProvider from './context/themeContext';

function App() {
  return (
    <ThemeModeProvider>
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
    </ThemeModeProvider>
  );
}

export default App;
