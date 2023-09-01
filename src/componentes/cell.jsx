import PropTypes from 'prop-types';

const Cell = ({ onClick, isShip, isComputerShot, isPlayerShot, isSunk }) => {
  return (
    <div
      className={`cell ${isShip ? 'ship' : ''} ${
        isComputerShot ? 'computer-shot' : ''
      } ${isPlayerShot ? 'player-shot' : ''} ${isSunk ? 'sunk' : ''}`}
      onClick={onClick}
    >
      
    </div>
  );
};

Cell.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShip: PropTypes.bool.isRequired,
  isComputerShot: PropTypes.bool.isRequired,
  isPlayerShot: PropTypes.bool.isRequired,
  isSunk: PropTypes.bool.isRequired,
};

export default Cell;