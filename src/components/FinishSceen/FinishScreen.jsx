import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button/Button'
import '../../scss/index.scss'

export const FinishScreen = () => {
  const answersCount = useSelector((state) => state.mainSlice.answersCount)
  
  return (
    <div>
      <h1 className='title'>Вітаємо, тест закінчено!</h1>
      <div>
        <div className='analytic'>Правильних відповідей: <span style={{ color: 'blue' }}>{answersCount.correct}</span></div>
        <div className='analytic'>Не правильних відповідей: <span style={{ color: 'red' }}>{answersCount.wrong}</span></div>
      </div>
      <Button className={'btn btn--center'} text={'Повторити'} onClick={() => window.location.reload()} />
    </div>
  )
}

