import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Inner from './components/Inner';
import TicTacToePage from './components/TicTacToePage';
import RockScissorsPaperPage from './components/RockScissorsPaperPage';

function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inner-page/:username" element={<Inner />} />
            <Route path="/tictactoe/:roomId" element={<TicTacToePage />} />
            <Route path="/rsp/:roomId" element={<RockScissorsPaperPage />} />
          </Routes>
        </Router>
  );
}

export default App;
