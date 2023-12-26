import React from 'react';
import { AppContainer } from './Login';
import { useParams } from 'react-router-dom';
import RockScissorsPaper from './RockScissorsPaper';

const RCSPage = () => {

  const { roomId } = useParams();
  return (
    <AppContainer className="App bg-dark text-light p-5">
      <h2 className="mb-4">Камень-ножницы-бумага</h2>
      <RockScissorsPaper roomId={roomId} />
    </AppContainer>
  );
};

export default RCSPage;
