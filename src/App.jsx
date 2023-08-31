import { useState } from "react";
import "./style/index.css";
import GameBoardUser from "./componentes/GameBoardUser";
import GameBoardComputer from "./componentes/GameBoardComputer";

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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const shipTypes = [
  { length: 4, name: "Barco de 4 Espacios" },
  { length: 3, name: "Barco de 3 Espacios" },
  { length: 2, name: "Barco de 2 Espacios" },
  { length: 5, name: "Barco de 5 Espacios" },
];
const initialComputerGameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function generateRandomPosition(length, gameBoard) {
  const isHorizontal = Math.random() < 0.5;
  const maxIndex = 10 - length;

  let rowIndex, columnIndex;

  if (isHorizontal) {
    rowIndex = Math.floor(Math.random() * 10);
    columnIndex = Math.floor(Math.random() * maxIndex);
  } else {
    rowIndex = Math.floor(Math.random() * maxIndex);
    columnIndex = Math.floor(Math.random() * 10);
  }

  // Validar que la posición generada sea válida y no se superponga con otros barcos
  for (let i = 0; i < length; i++) {
    if (isHorizontal && gameBoard[rowIndex][columnIndex + i] !== 0) {
      return generateRandomPosition(length, gameBoard); // Generar nuevamente si no es válido
    } else if (!isHorizontal && gameBoard[rowIndex + i][columnIndex] !== 0) {
      return generateRandomPosition(length, gameBoard); // Generar nuevamente si no es válido
    }
  }

  return { rowIndex, columnIndex, isHorizontal };
}

function App() {
  const [userGameBoard, setUserGameBoard] = useState(initialGameBoard);
  const [placingShip, setPlacingShip] = useState(false);
  const [placedShips, setPlacedShips] = useState(0);
  const [selectedOrientation, setSelectedOrientation] = useState("horizontal");
  const [selectedShipType, setSelectedShipType] = useState(null);
  const [placedShipTypes, setPlacedShipTypes] = useState([]);
  const [computerGameBoard, setComputerGameBoard] = useState(
    initialComputerGameBoard
  ); // Estado para el tablero de la computadora
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Indica si es el turno del jugador
  const [gameOver, setGameOver] = useState(false); // Indica si el juego ha terminado
  const [playerShots, setPlayerShots] = useState([]); // Almacena las celdas que el jugador ha disparado
  const [computerShots, setComputerShots] = useState([]); // Almacena las celdas que la computadora ha disparado

  const placeUserShip = (rowIndex, columnIndex) => {
    if (placingShip && selectedShipType && placedShips < shipTypes.length) {
      const newGameBoard = [...userGameBoard];
      const length = selectedShipType.length;

      if (
        (selectedOrientation === "horizontal" && columnIndex + length <= 10) ||
        (selectedOrientation === "vertical" && rowIndex + length <= 10)
      ) {
        let canPlace = true;
        if (selectedOrientation === "horizontal") {
          for (let i = columnIndex; i < columnIndex + length; i++) {
            if (newGameBoard[rowIndex][i] !== 0) {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = columnIndex; i < columnIndex + length; i++) {
              newGameBoard[rowIndex][i] = 1;
            }
            setUserGameBoard(newGameBoard);
            setPlacingShip(false);
            setPlacedShips(placedShips + 1);
            setPlacedShipTypes([...placedShipTypes, selectedShipType]);
          }
        } else if (selectedOrientation === "vertical") {
          for (let i = rowIndex; i < rowIndex + length; i++) {
            if (newGameBoard[i][columnIndex] !== 0) {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = rowIndex; i < rowIndex + length; i++) {
              newGameBoard[i][columnIndex] = 1;
            }
            setUserGameBoard(newGameBoard);
            setPlacingShip(false);
            setPlacedShips(placedShips + 1);
            setPlacedShipTypes([...placedShipTypes, selectedShipType]);
          }
        }
      }
    }
  };
  function checkAllShipsSunk(gameBoard) {
    for (let row = 0; row < gameBoard.length; row++) {
      for (let col = 0; col < gameBoard[row].length; col++) {
        if (gameBoard[row][col] === 1) {
          // Si encuentra un barco que no está hundido, devuelve falso
          return false;
        }
      }
    }
    // Si no encuentra ningún barco sin hundir, devuelve verdadero
    return true;
  }

  const generateComputerShips = () => {
    const newComputerGameBoard = generateEmptyGameBoard(); // Función que crea un nuevo tablero vacío

    for (const shipType of shipTypes) {
      const { rowIndex, columnIndex, isHorizontal } = generateRandomPosition(
        shipType.length,
        newComputerGameBoard
      );

      if (isHorizontal) {
        for (let i = columnIndex; i < columnIndex + shipType.length; i++) {
          newComputerGameBoard[rowIndex][i] = 1;
        }
      } else {
        for (let i = rowIndex; i < rowIndex + shipType.length; i++) {
          newComputerGameBoard[i][columnIndex] = 1;
        }
      }
    }

    setComputerGameBoard(newComputerGameBoard);
  };

  const generateEmptyGameBoard = () => {
    const newGameBoard = [];
    for (let i = 0; i < 10; i++) {
      newGameBoard.push(Array(10).fill(0));
    }
    return newGameBoard;
  };

  const handlePlayerShot = (rowIndex, columnIndex) => {
    if (
      isPlayerTurn &&
      !gameOver &&
      !playerShots.includes(`${rowIndex}-${columnIndex}`)
    ) {
      // Marcar la celda como disparada
      const newPlayerShots = [...playerShots, `${rowIndex}-${columnIndex}`];
      setPlayerShots(newPlayerShots);

      // Verificar si el disparo impacta en un barco de la computadora
      const isHit = computerGameBoard[rowIndex][columnIndex] === 1;

      // Actualizar el tablero de la computadora si el disparo impacta
      if (isHit) {
        const newComputerGameBoard = [...computerGameBoard];
        newComputerGameBoard[rowIndex][columnIndex] = 2; // 2 representa un disparo acertado
        setComputerGameBoard(newComputerGameBoard);

        // Verificar si todos los barcos de la computadora han sido hundidos
        const allComputerShipsSunk = checkAllShipsSunk(newComputerGameBoard);
        if (allComputerShipsSunk) {
          setGameOver(true);
          return;
        }
      }

      // Cambiar el turno al siguiente jugador (computadora)
      setIsPlayerTurn(false);
      setTimeout(handleComputerShot, 1000); // Simular el disparo de la computadora después de un breve retraso
    }
  };

  const handleComputerShot = () => {
    if (!isPlayerTurn && !gameOver) {
      console.log("Computadora disparando...");
      
      // Generar posición aleatoria para el disparo de la computadora en el tablero del jugador
      let rowIndex, columnIndex;
      do {
        rowIndex = Math.floor(Math.random() * 10);
        columnIndex = Math.floor(Math.random() * 10);
      } while (playerShots.includes(`${rowIndex}-${columnIndex}`));
      
       // Marcar la celda como disparada
    const newComputerShots = [...computerShots, `${rowIndex}-${columnIndex}`];
    setComputerShots(newComputerShots); // Aquí actualizamos el estado de computerShots

  
      // Marcar la celda como disparada por la computadora en el tablero del jugador
      const newUserGameBoard = [...userGameBoard];
      if (newUserGameBoard[rowIndex][columnIndex] === 1) {
        newUserGameBoard[rowIndex][columnIndex] = 2; // 2 representa un disparo acertado
      }
      setUserGameBoard(newUserGameBoard);
  
      // Verificar si todos los barcos del jugador han sido hundidos
      const allPlayerShipsSunk = checkAllShipsSunk(newUserGameBoard);
      if (allPlayerShipsSunk) {
        setGameOver(true);
        return;
      }
  
      setIsPlayerTurn(true);
    }
  };
  return (
    <div className="App">
      <h1>Battle Ship Game</h1>
      {/* ... Renderización de componentes ... */}
      <div>
        {isPlayerTurn
          ? "Es el turno del jugador"
          : "Es el turno de la computadora"}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            {!placingShip && placedShips < shipTypes.length && (
              <div className="contenedor-botones">
                <label className="label">
                  Orientación:
                  <select
                    className="form-select m-1"
                    value={selectedOrientation}
                    onChange={(e) => setSelectedOrientation(e.target.value)}
                  >
                    <option value="horizontal">Vertical</option>
                    <option value="vertical">Horizontal</option>
                  </select>
                </label>
                {shipTypes.map((shipType) => {
                  if (!placedShipTypes.includes(shipType)) {
                    return (
                      <button
                        className="btn btn-primary m-2"
                        key={shipType.length}
                        onClick={() => {
                          setPlacingShip(true);
                          setSelectedShipType(shipType);
                        }}
                      >
                        {shipType.name}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            <div className="col-6">
              <GameBoardUser
                gameBoard={userGameBoard}
                placeUserShip={placeUserShip}
              />
            </div>
          </div>
        </div>
      </div>
      <button onClick={generateComputerShips}>
        Generar Barcos de la Computadora
      </button>
      <GameBoardComputer
  gameBoard={computerGameBoard}
  isPlayerTurn={isPlayerTurn}
  playerShots={playerShots}
  computerShots={computerShots} // Asegúrate de incluir esta propiedad
  handlePlayerShot={handlePlayerShot}
  handleComputerShot={handleComputerShot}
  gameOver={gameOver}
  className="computer"
/>
      {gameOver && (
        <div className="game-over-message">
          {isPlayerTurn ? "¡Ganaste!" : "La computadora ganó."}
        </div>
      )}
    </div>
  );
}

export default App;
