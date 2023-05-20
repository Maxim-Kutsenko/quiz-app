import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button/Button'

export const FinishScreen = () => {
    const analytic = useSelector((state) => state.mainSlice.analytic)

    return (
        <>
          <h1 className='title'>Вітаємо, тест закінчено!</h1>
          <div>
            <div className='analytic'>Правильних відповідей: <span style={{ color: 'blue' }}>{analytic.correct}</span></div>
            <div className='analytic'>Не правильних відповідей: <span style={{ color: 'red' }}>{analytic.wrong}</span></div>
          </div>
        <Button text={'Повторити'} onClick={()=>window.location.reload()}/>
        </>
      )
}

