import React from 'react'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { startQuiz, setQuizAmount } from '../../redux/mainSlice'
import '../../scss/index.scss'

export const StartQuizScreen = () => {
  const dispatch = useDispatch()
  const readyToStart = useSelector((state) => state.mainSlice.readyToStart)
  const [activeButtonId, setActiveButtonId] = React.useState(null);

  function clickHandler(event, id) {
    setActiveButtonId(id);
    let currentId = +event.target.dataset.id
    dispatch(setQuizAmount(currentId))
  }
  return (

    <div>
      <h1 className='title'>Готові розпочати тест?</h1>
      <h2 style={{ marginBottom: 20, fontSize: 25 }}>Оберіть кількість питань</h2>
      <div className="small-btn-wrap">
        <Button className={`btn btn--small ${activeButtonId === 5 ? 'active' : ''}`}
          text={5}
          id={5}
          onClick={(event) => clickHandler(event, 5)}
        />
        <Button className={`btn btn--small ${activeButtonId === 10 ? 'active' : ''}`}
          text={10}
          id={10}
          onClick={(event) => clickHandler(event, 10)} />
        <Button className={`btn btn--small ${activeButtonId === 15 ? 'active' : ''}`}
          text={15}
          id={15}
          onClick={(event) => clickHandler(event, 15)} />
        <Button className={`btn btn--small ${activeButtonId === 20 ? 'active' : ''}`}
          text={20}
          id={20}
          onClick={(event) => clickHandler(event, 20)} />
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
