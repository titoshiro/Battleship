import PropTypes from 'prop-types';


const Cell = ({ onClick, isShip }) => {
  return (
    <div
      className={`cell ${isShip ? 'ship' : ''}`}
      onClick={onClick}
      style={{
        backgroundColor: isShip ? 'blue' : '#dcdcdc',
        color: isShip ? '#ffffff' : '#000000',
      }}
    >
      
    </div>
  );
};
Cell.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShip: PropTypes.bool.isRequired,
};

export default Cell;