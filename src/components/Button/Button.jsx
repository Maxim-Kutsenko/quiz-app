import React from 'react'
import '../../scss/index.scss'
const Button = ({ onClick, backColor, text, id, disabled,className }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      data-id={id}
      style={{backgroundColor:backColor}}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button