import { useState } from 'react'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { Title } from '../Title/Title'
import { useDispatch, useSelector } from 'react-redux'
import { startQuiz, setQuizAmount } from '../../redux/rootSlice'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'


const TitleWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
`
const Select = styled(Button).attrs({ as: 'select' })``

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
      <Title>Are you ready to start the test?</Title>
      <TitleWrap>
        <Select name="select"
          select
          onChange={changeHandler}
          defaultValue={'Select the amount of questions'}
        >
          <option value="Select the amount of questions" disabled >Select the amount of questions</option>
          <option value="5" >5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </Select>
      </TitleWrap>
      <Button center notActive={!readyToStart} onClick={clickHandler}>Get started</Button>
      <CSSTransition
        in={showModal}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <Modal
          text={'Select the amount of questions first!'}
          buttonRequired={false}
          onConfirm={() => setShowModal(false)}
        />
      </CSSTransition>


    </div>
  )
}
