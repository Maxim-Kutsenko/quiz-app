import './button.scss'
export const Button = ({ onClick, backColor, disabled,className, children  }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{backgroundColor:backColor}}
      disabled={disabled}
    > 
      {children}
    </button>
  )
}

