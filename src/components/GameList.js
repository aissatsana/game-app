import React from 'react';
import GameItem from './GameItem';

const GameList = () => {
  const gamesData = [
    { title: 'Крестики-нолики', imgSrc: '/img/tictac.jpg', path: '/tictactoe', gametype:'tictactoe', rules: 'Первый, выстроивший в ряд 3 своих фигуры по вертикали, горизонтали или большой диагонали, выигрывает. Если игроки заполнили все 9 ячеек и оказалось, что ни в одной вертикали, горизонтали или большой диагонали нет трёх одинаковых знаков, партия считается закончившейся в ничью'},
    { title: 'Камень ножницы бумага', imgSrc: '/img/rsp.jpg', path: '/rsp', gametype:'rockscissorspaper',rules: `Игроки за 5 секунд выбирают Камень, ножницы или бумагу. Знаки изображены на экране. Победитель определяется по следующим правилам:
    • Бумага побеждает камень («бумага обёртывает камень»).
    • Камень побеждает ножницы («камень затупляет ножницы»).
    • Ножницы побеждают бумагу («ножницы разрезают бумагу»).
   Если игроки показали одинаковый знак, то засчитывается ничья.` },
  ];

  return (
    <ul className="list-group d-flex flex-row justify-content-around">
      {gamesData.map((game, index) => (
        <GameItem key={index} title={game.title} imgSrc={game.imgSrc} rules={game.rules} path={game.path} gametype={game.gametype}/>
      ))}
    </ul>
  );
};

export default GameList;
