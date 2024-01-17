
import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import ResetButton from './components/ResetButton';
import ScoreBoard from './components/ScoreBoard';
import ConfettiExplosion from 'react-confetti-explosion';

function App() {
  const [isExploding, setIsExploding] = useState(false);
  const WIN_CONDITIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]
  const [gameOver, setGameOver] =useState(false)
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXplaying] = useState(true)
  const [score, setScore] = useState({xScore:0, oScore: 0})
  const handleBoxClick = (boxIdx)=>{
    // step 1 update the board
    const updatedBoard = board.map((value, idx)=>{
      
      if(idx === boxIdx){
        return xPlaying === true ? "X" :"O";
      }
      else{
        return value;
      }
    })
    const winner = checkWinner(updatedBoard);
    if(winner) {
      if(winner === "O"){
        let {oScore} = score;
        oScore +=1
        setScore({...score, oScore})
      }else{
        let {xScore} = score;
        xScore +=1
        setScore({...score, xScore})

      }
    }
    
    setBoard(updatedBoard)
    setXplaying(!xPlaying)
  }
  const checkWinner  = (board) =>{
    for (let i = 0; i< WIN_CONDITIONS.length; i++){
      const [x,y,z] = WIN_CONDITIONS[i];
      if(board[x] && board[x] === board[y] && board[y] === board[z]){
        setGameOver(true)
        setIsExploding(true);
        return board[x];
      }
    }
  }
  const resetBoard = ()=>{
    setGameOver(false)
    setBoard(Array(9).fill(null))
  }
  useEffect(() => {
    if (isExploding) {
      const timeoutId = setTimeout(() => {
        setIsExploding(false); 
      }, 5000);
  
      return () => clearTimeout(timeoutId); 
    }
  }, [isExploding]);
  
 
  return (
    <div className='App'>
      {isExploding && <ConfettiExplosion 
       force={0.8}
       duration={3000}
       particleCount={250}
       width={1600}
        />}
      
      <ScoreBoard score= {score} xPlaying={xPlaying}/>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick}/>
      <ResetButton resetBoard = {resetBoard}/>

    
    </div>
  );
}

export default App;
