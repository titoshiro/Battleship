
import GameBoard from './componentes/GameBoard';
import './style/tablero.css';
import { useState } from 'react';


const initialGameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


function App() {

  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [placedShips, setPlacedShips] = useState([]); // Estado para almacenar las coordenadas de los barcos colocados
  


  const fireTorpedo = (rowIndex, columnIndex) => {
    // Cambia el valor en la matriz del tablero de juego
    const newGameBoard = [...gameBoard];
    if (newGameBoard[rowIndex][columnIndex] === 1) {
      newGameBoard[rowIndex][columnIndex] = 2; // Parte del barco hundido
    } else if (newGameBoard[rowIndex][columnIndex] === 0) {
      newGameBoard[rowIndex][columnIndex] = 3; // Disparo fallido
    }
    setGameBoard(newGameBoard);
   
  };
 
  const placeShip = (rowIndex, columnIndex) => {
    // Crea una copia de la matriz del tablero de juego
    const newGameBoard = [...gameBoard];

    // Coloca un barco en la celda especificada
    newGameBoard[rowIndex][columnIndex] = 1;

    // Actualiza el estado del tablero de juego
    setGameBoard(newGameBoard);

    // Actualiza el estado de los barcos colocados con las coordenadas actuales
    setPlacedShips([...placedShips, { row: rowIndex, column: columnIndex }]);
  };

  

  return (
    <div className="App">
      <h1>Battle Ship Game</h1>
      <GameBoard gameBoard={gameBoard} 
      fireTorpedo={fireTorpedo}
      placedShips={placedShips}// Pasa las coordenadas de los barcos colocados al componente GameBoard
      placeShip={placeShip} // Pasa la función placeShip al componente GameBoard
       />
    </div>
  );
}

export default App;