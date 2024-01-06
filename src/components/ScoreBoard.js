import React from 'react'
import './ScoreBoard.css'
function ScoreBoard({score, xPlaying}) {
    const {xScore, oScore} = score;
  return (
    <div className='scoreboard'>
        <span className={`score x-score ${!xPlaying && "inactive"}`}> X - {xScore}</span>
        <span className={`score o-score ${xPlaying && "inactive"}`}> O - {oScore}</span>

    </div>
  )
}

export default ScoreBoard