import './button.scss'
export const Button = ({ onClick, disabled, className, children }) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)


