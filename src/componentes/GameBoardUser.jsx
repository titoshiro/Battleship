import PropTypes from 'prop-types';
import '../style/GameBoardUser.css';
import Cell from './cell.jsx';

const GameBoardUser = ({ gameBoard, placeUserShip, computerShots }) => {
  return (
    <div className="game-container">
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellValue, columnIndex) => (
            <Cell
              key={columnIndex}
              isShip={cellValue === 1}
              isComputerShot={computerShots.includes(`${rowIndex}-${columnIndex}`)}
              isSunk={cellValue === 2} // Assuming cellValue of 2 represents a sunk ship
              isPlayerShot={false} // Set this value according to your logic
              onClick={() => placeUserShip(rowIndex, columnIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

GameBoardUser.propTypes = {
  gameBoard: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  placeUserShip: PropTypes.func.isRequired,
  computerShots: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GameBoardUser;