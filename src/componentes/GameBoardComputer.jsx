import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../style/GameBoardComputer.css';

function GameBoardComputer({
  gameBoard,
  isPlayerTurn,
  playerShots,
  handlePlayerShot,
  gameOver,
  handleComputerShot,
}) {
  const handleCellClick = (rowIndex, columnIndex) => {
    if (isPlayerTurn && !gameOver) {
      handlePlayerShot(rowIndex, columnIndex);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      handleComputerShot();
    }
  }, [isPlayerTurn, gameOver, handleComputerShot]);

  return (
    <div className="game-container-computer">
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellValue, columnIndex) => {
            const cellId = `${rowIndex}-${columnIndex}`;
            const isPlayerShot = playerShots.includes(cellId);

            return (
              <div
              key={columnIndex}
              className={`cell ${
                cellValue === 1
                  ? 'ship'
                  : isPlayerShot && cellValue === 1
                  ? 'hit'
                  : isPlayerShot && cellValue !== 2
                  ? 'miss' // Agregar la clase miss si es un disparo fallido
                  : isPlayerShot
                  ? 'player-shot'
                  : ''
              }`}
              onClick={() => handleCellClick(rowIndex, columnIndex)}
            >
              {cellValue === 2 ? 'X' : null}
            </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

GameBoardComputer.propTypes = {
  gameBoard: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  isPlayerTurn: PropTypes.bool.isRequired,
  playerShots: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlePlayerShot: PropTypes.func.isRequired,
  handleComputerShot: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
};

export default GameBoardComputer;