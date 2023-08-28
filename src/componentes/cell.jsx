
import PropTypes from 'prop-types';

const Cell = ({ value, onClick }) => {
  const cellClass = value === 1 ? 'ship' : '';

  return <div className={`cell ${cellClass}`} onClick={onClick}></div>;
};

Cell.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;