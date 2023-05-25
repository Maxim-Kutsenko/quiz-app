import React from 'react'
import '../../scss/index.scss'
const Button = ({ onClick, backColor, text,  disabled,className }) => {
  return (
    <button
      className={className}
      onClick={onClick}

      style={{backgroundColor:backColor}}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button