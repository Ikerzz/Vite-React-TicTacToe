import { useState } from "react"

const TURNS = {
    X : 'x',
    O : 'o'
}

const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${ isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_TURNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  const [board, setBoard] = useState(
      Array(9).fill(null)
    )

  // Usamos el estado para establecer el TURNO de el jugador.
  const [turn, setTurn] = useState(TURNS.X)

  // Si el valor es null significa que no hay ningun ganador, si hay false es un empate.
  const [winner, setWinner] = useState(null) 

  // Con esto se revisa si hay un ganador, en caso de que no devolveremos null.
  const checkWinner = (boardToCheck) => {
    for (const winner_turn of WINNER_TURNS) {
      const [a, b, c] = winner_turn
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }

    return null;
  }

  const emptyBoard = () => {
    const emptyBoard = Array(9).fill(null);
    setBoard(emptyBoard)
    setWinner(null)
  }
 
  const updateBoard = (index) => {

    // Si ya existe el valor en esa celda no se permite escribir ahí.
    if (board[index] || winner) return;

    // Actualizamos el tablero con el valor del usuario
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard)

    // Se actualiza el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisar si hay un ganador actual.
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }


  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((cell,index) => {
            return (
              <Square 
              key = {index}
              index = {index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <section className="turn">
        <button style={{width : '100%'}} onClick={emptyBoard}>Vaciar Tablero</button>
      </section>
    </main>
  )
}

export default App
