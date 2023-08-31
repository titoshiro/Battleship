
import PropTypes from 'prop-types';
import '../style/GameBoardUser.css';
import Cell from './cell.jsx'; // Asegúrate de tener la ruta correcta a tu componente Cell

const GameBoardUser = ({ gameBoard, placeUserShip }) => {
  return (
    <div className="game-container">
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellValue, columnIndex) => (
            <Cell
              key={columnIndex}
              isShip={cellValue === 1} // Pasa la prop isShip basada en cellValue
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