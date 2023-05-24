import React from 'react'
import '../../scss/index.scss'

export const QuizButton = ({ text, id, className, onClick, checked }) => {
    return (
        <div className={className} onClick={onClick}>
            <input type="radio" name="radio" id="radio" value={text} data-id={id} checked={checked} />
            <label htmlFor="radio">{text}</label>
        </div>
    )
}
