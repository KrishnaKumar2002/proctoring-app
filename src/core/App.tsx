import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import { Home } from '../pages/Home';

const AppContainer = styled.div`
	background-color: ${({ theme }) => theme.colors.light};
	color: ${({ theme }) => theme.colors.dark};
	font-family: ${({ theme }) => theme.fonts.primary};
	padding: 1rem;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/proctoring-app/" element={<Home />} />
          <Route path="/proctoring-app/dashboard" element={<></>} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
