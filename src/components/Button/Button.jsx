import './button.scss'
export const Button = ({ onClick, backColor, text, id, disabled,className, children  }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      data-id={id}
      style={{backgroundColor:backColor}}
      disabled={disabled}
    > 
      {children}
    </button>
  )
}

