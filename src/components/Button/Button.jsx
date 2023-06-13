import './button.scss'
export const Button = ({ onClick, backColor, text, id, disabled,className, quizNumber  }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      data-id={id}
      style={{backgroundColor:backColor}}
      disabled={disabled}
    >
    {quizNumber && <span className='quiz-number'>{id+1}</span>}  
      {text}
    </button>
  )
}

