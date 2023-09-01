
import PropTypes from 'prop-types';
import "../style/instrucciones.css";

const Instrucciones = ({ comenzar }) => {
  return (
    <div className="instrucciones">
      <div className="card " style={{ width: "800px" }}>
        <div className="card-body text-center">
          <h5 className="card-title">Bienvenido a Batalla Naval!</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">Antes de comenzar, aquí tienes las instrucciones:</h6>
          <p className="card-text"> Elige la orientación de tu barco </p>
          <p className="card-text">Coloca tus barcos en tu tablero dándole clic al barco y luego en el tablero hasta poner los 4.</p>
          <p className="card-text">Una vez que estés listo, haz clic en Comenzar Juego.</p>
          <p className="card-text">Tu objetivo es hundir todos los barcos de la computadora antes de que ella hunda los tuyos.</p>
          <p className="card-text">Los disparos se alternarán entre tú y la computadora. Haz clic en las celdas del tablero de la computadora para disparar.</p>
          <p className="card-text">¡Buena suerte y que gane el mejor!</p>
          <button onClick={comenzar} type="button" className="btn btn-primary">Comenzar el juego</button>
        </div>
      </div>
    </div>
  );
};

Instrucciones.propTypes = {
  comenzar: PropTypes.func.isRequired
};

export default Instrucciones;