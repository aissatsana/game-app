import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import GameList from './GameList';

function Inner() {
  const { username } = useParams();
  const AppContainer = styled.div`
  min-height: 100vh; /* Установка минимальной высоты */
`;

  return (
    <AppContainer className="App bg-dark text-light p-5">
      <h2 className="mb-4">Добро пожаловать на вторую страницу</h2>
      <h2>Здравствуйте, {username}</h2>
      <div className="mt-4">
        <h2>Список игр</h2>
        <GameList />
      </div>
    </AppContainer>
  );
}

export default Inner;
