import React from 'react'
import './Board.css'
import Box from './Box'
const Board = ({board, onClick}) => {
  return (
    <div className='board'>
        {board.map((data, idx)=>
        {
            return <Box key={idx} value={data} onClick={()=> data === null && onClick(idx)}/>
        }
        
        
        )}
    </div>
  )
}

export default Board