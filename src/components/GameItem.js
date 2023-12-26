import React from 'react';
import RulesModal from './RulesModal';
import JoinGame from './JoinGame';
import CreateGame from './CreateGame';

const GameItem = ({ title, imgSrc, rules, path, gametype }) => {
  return (
    <div className="list-group-item bg-dark text-light d-flex flex-column justify-content-between align-items-center" style={{border: '3px solid white', width: '400px' }}>
      <div>
        <h4>{title}</h4>
        <img src={imgSrc} alt={title} style={{ maxWidth: '200px', maxHeight: '200px' }} className="mt-2 mb-4" />
      </div>
      <div className='d-flex flex-column'>
        <RulesModal title={title} rules={rules} />
        <CreateGame path={path} gametype={gametype} />
        <JoinGame path={path} />
      </div>
    </div>
  );
};

export default GameItem;
