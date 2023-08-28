
import Cell from './cell'; // Asegúrate de tener la importación correcta
import PropTypes from 'prop-types';
import "../style/GameBoardUser.css"

const GameBoardUser = ({ gameBoard, placeUserShip }) => {
  return (
    <div className="game-container card-body">
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
         {row.map((cellValue, columnIndex) => (
  <Cell
    key={columnIndex}
    value={cellValue}
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
};

export default GameBoardUser;