import React from 'react';
import TicTacToe from './TicTacToe';
import { AppContainer } from './Login';
import { useParams } from 'react-router-dom';

const TicTacToePage = () => {

  const { roomId } = useParams();
  return (
    <AppContainer className="App bg-dark text-light p-5">
      <h2 className="mb-4">Крестики-нолики</h2>
      <TicTacToe roomId={roomId} />
    </AppContainer>
  );
};

export default TicTacToePage;
