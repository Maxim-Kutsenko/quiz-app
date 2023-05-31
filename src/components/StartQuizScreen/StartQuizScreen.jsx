import React from 'react'
import {Button} from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { startQuiz, setQuizAmount } from '../../redux/mainSlice'
import '../../scss/index.scss'

export const StartQuizScreen = () => {
  const dispatch = useDispatch()
  const readyToStart = useSelector((state) => state.mainSlice.readyToStart)

  function changeHandler(event) {
    dispatch(setQuizAmount(+event.target.value))
  }
  return (

    <div>
      <h1 className='title'>Готові розпочати тест?</h1>
      <div className='title-wrap'>
        <select name="select"
          className='btn btn--select'
          onChange={changeHandler}
          defaultValue={'Оберіть кількість питань'}
        >
          <option value="Оберіть кількість питань" disabled >Оберіть кількість питань</option>
          <option value="5" >5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <Button
        className={'btn btn--center'}
        text={'Розпочати'}
        disabled={!readyToStart}
        onClick={() => dispatch(startQuiz())}
      />
    </div>
  )
}
