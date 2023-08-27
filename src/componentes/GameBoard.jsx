
import PropTypes from 'prop-types';
import Cell from './cell.jsx'; // Asegúrate de tener la importación correcta

const GameBoard = ({ gameBoard, fireTorpedo, placedShips, placeShip }) => {
    return (
      <div className="game-container">
        {gameBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cellValue, columnIndex) => (
              <Cell
                key={columnIndex}
                value={cellValue}
                onClick={() => {
                  if (!placedShips.some(ship => ship.row === rowIndex && ship.column === columnIndex)) {
                    placeShip(rowIndex, columnIndex);
                  } else {
                    fireTorpedo(rowIndex, columnIndex);
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  GameBoard.propTypes = {
    gameBoard: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    fireTorpedo: PropTypes.func.isRequired,
    placedShips: PropTypes.arrayOf(PropTypes.object).isRequired,
    placeShip: PropTypes.func.isRequired,
  };
  
  export default GameBoard;