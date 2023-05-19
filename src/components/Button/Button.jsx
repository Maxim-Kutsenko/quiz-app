import React from 'react'
import './index.scss'
const Button = ({onClick, color, text, id}) => {
  return (
    <button onClick={onClick} data-id={id}>{text}</button>
  )
}

export default Button