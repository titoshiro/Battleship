
import PropTypes from 'prop-types';

const Cell = ({ value, onClick }) => {
  const cellClass = value === 1 ? 'ship' : value === 2 ? 'sunk-ship' : value === 3 ? 'missed-shot' : '';

  return <div className={`cell ${cellClass}`} onClick={onClick}></div>;
};

Cell.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;