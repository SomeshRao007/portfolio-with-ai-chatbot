import React, { useState, useEffect, useCallback } from 'react';

const SIZE = 4;
const WINNING_TILE = 2048;

type TileProps = { value: number };

const TILE_COLORS: { [key: number]: string } = {
  0: 'bg-gray-700/50',
  2: 'bg-green-900 text-green-300',
  4: 'bg-green-800 text-green-200',
  8: 'bg-teal-900 text-teal-300',
  16: 'bg-teal-800 text-teal-200',
  32: 'bg-cyan-900 text-cyan-300',
  64: 'bg-cyan-800 text-cyan-200',
  128: 'bg-sky-900 text-sky-300',
  256: 'bg-sky-800 text-sky-200',
  512: 'bg-indigo-900 text-indigo-300',
  1024: 'bg-indigo-800 text-indigo-200',
  2048: 'bg-purple-900 text-purple-200',
};

const Tile: React.FC<TileProps> = ({ value }) => {
  const color = TILE_COLORS[value] || 'bg-red-800 text-red-200';
  const textClass = value > 1000 ? 'text-xl' : 'text-2xl';

  return (
    <div className={`flex items-center justify-center h-full w-full rounded-md font-bold transition-all duration-200 ${color}`}>
      {value > 0 && <span className={textClass}>{value}</span>}
    </div>
  );
};

const Game2048: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [board, setBoard] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const getEmptyCells = (currentBoard: number[][]) => {
    const cells = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (currentBoard[r][c] === 0) {
          cells.push({ r, c });
        }
      }
    }
    return cells;
  };

  const addRandomTile = (currentBoard: number[][]): number[][] => {
    const emptyCells = getEmptyCells(currentBoard);
    if (emptyCells.length > 0) {
      const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newBoard = [...currentBoard.map(row => [...row])];
      newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
      return newBoard;
    }
    return currentBoard;
  };

  const initBoard = useCallback(() => {
    let newBoard = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    newBoard = addRandomTile(newBoard);
    newBoard = addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  const operateOnRow = (row: number[]): { newRow: number[]; score: number } => {
    let filtered = row.filter(val => val !== 0);
    let newScore = 0;
    for (let i = 0; i < filtered.length - 1; i++) {
      if (filtered[i] === filtered[i + 1]) {
        filtered[i] *= 2;
        newScore += filtered[i];
        filtered.splice(i + 1, 1);
      }
    }
    while (filtered.length < SIZE) {
      filtered.push(0);
    }
    return { newRow: filtered, score: newScore };
  };

  const move = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver) return;
    let newBoard = board.map(row => [...row]);
    let totalScore = 0;
    let moved = false;

    const rotate = (b: number[][]) => b[0].map((_, c) => b.map(r => r[c])).reverse();
    
    if (direction === 'left' || direction === 'right') {
        for (let r = 0; r < SIZE; r++) {
            const row = newBoard[r];
            const originalRow = [...row];
            const newRowData = operateOnRow(direction === 'left' ? row : [...row].reverse());
            newBoard[r] = direction === 'left' ? newRowData.newRow : newRowData.newRow.reverse();
            totalScore += newRowData.score;
            if (JSON.stringify(originalRow) !== JSON.stringify(newBoard[r])) moved = true;
        }
    } else { // 'up' or 'down'
        newBoard = rotate(newBoard);
        if (direction === 'down') newBoard = rotate(rotate(newBoard));
        for (let r = 0; r < SIZE; r++) {
            const row = newBoard[r];
            const originalRow = [...row];
            const newRowData = operateOnRow(row);
            newBoard[r] = newRowData.newRow;
            totalScore += newRowData.score;
            if (JSON.stringify(originalRow) !== JSON.stringify(newBoard[r])) moved = true;
        }
        if (direction === 'down') newBoard = rotate(rotate(newBoard));
        newBoard = rotate(rotate(rotate(newBoard)));
    }


    if (moved) {
      const boardWithNewTile = addRandomTile(newBoard);
      setBoard(boardWithNewTile);
      setScore(s => s + totalScore);
    }
  }, [board, gameOver]);

  useEffect(() => {
    const isOver = () => {
      if (getEmptyCells(board).length > 0) return false;
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          const current = board[r][c];
          if ((r < SIZE - 1 && board[r + 1][c] === current) || (c < SIZE - 1 && board[r][c + 1] === current)) {
            return false;
          }
        }
      }
      return true;
    };

    if (board.length > 0 && isOver()) {
      setGameOver(true);
    }
  }, [board]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
      case 'ArrowUp': move('up'); break;
      case 'ArrowDown': move('down'); break;
      case 'ArrowLeft': move('left'); break;
      case 'ArrowRight': move('right'); break;
    }
  }, [move]);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isActive, handleKeyDown]);

  return (
    <div className="relative w-full h-full p-4 bg-gray-900 font-mono text-green-400 select-none flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">2048</h1>
        <div className="text-right">
          <span className="block text-xs text-gray-400">SCORE</span>
          <span className="text-lg font-bold">{score}</span>
        </div>
      </div>

      <div className="w-full aspect-square p-2 bg-gray-800/50 rounded-lg">
        <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
          {board.map((row, rIdx) =>
            row.map((val, cIdx) => <Tile key={`${rIdx}-${cIdx}`} value={val} />)
          )}
        </div>
      </div>
      
       <div className="text-center">
        <p className="text-xs text-gray-500">Use arrow keys to play</p>
        <button onClick={initBoard} className="text-xs text-green-500 hover:underline">
          [ restart ]
        </button>
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
          <p className="text-4xl font-bold text-red-500">Game Over!</p>
          <button onClick={initBoard} className="mt-4 px-4 py-2 bg-green-700 text-green-200 rounded hover:bg-green-600">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Game2048;
