import { useState } from 'react'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { startQuiz, setQuizAmount } from '../../redux/rootSlice'
import { CSSTransition } from 'react-transition-group'
import '../../scss/index.scss'

export const StartQuizScreen = () => {
  const dispatch = useDispatch()
  const readyToStart = useSelector((state) => state.rootSlice.readyToStart)
  const [showModal, setShowModal] = useState(false)
  
  function changeHandler(event) {
    dispatch(setQuizAmount(+event.target.value))
  }

  function countHandler() {
    let clickCount = 0
    return function () {
      if (readyToStart) {
        dispatch(startQuiz())
      } else {
        clickCount++
        if (clickCount === 5) {
          setShowModal(true)
          clickCount = 0
        }
      }
    }
  }
  const clickHandler = countHandler()
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
        className={`btn btn--center ${!readyToStart ? 'btn--disabled' : ''}`}
        text={'Розпочати'}
        onClick={clickHandler}
      />
      <CSSTransition
        in={showModal}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <Modal
          text={'Оберіть кількість питань!'}
          buttonRequired={false}
          onConfirm={() => setShowModal(false)}
        />
      </CSSTransition>


    </div>
  )
}
