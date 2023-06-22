import { useState, useEffect } from 'react'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { Title } from '../Title/Title'
import { Container } from '../Container/Container'
import { useDispatch } from 'react-redux'
import { finishLoading, startLoading, finishLoadingWithError, setLogout } from '../../redux/rootSlice'
import { offlineData } from '../offlineData'
import { CSSTransition } from 'react-transition-group'
import './startScreen.scss'


export const StartScreen = () => {
  const [quizOptions, setQuizOptions] = useState({
    amount: null,
    category: null,
    difficulty: null,
  })
  const [valid, setValid] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const URL = `https://opentdb.com/api.php?amount=${quizOptions.amount}&category=${quizOptions.category}&type=multiple&difficulty=${quizOptions.difficulty}`

  async function fetchData() {
    dispatch(startLoading())
    try {
      const response = await fetch(URL)
      const data = await response.json()
      if (data.results.length) {
        dispatch(finishLoading(data.results))
      } else {
        dispatch(finishLoadingWithError(offlineData.questions))
      }

    } catch (e) {
      console.log(e);
      dispatch(finishLoadingWithError(offlineData.questions))
    }
  }

  function validation() {
    let isValid = false
    const optionsValues = Object.values(quizOptions)
    for (let i = 0; i < optionsValues.length; i++) {
      if (optionsValues[i] === null) {
        isValid = false
        break
      } else {
        isValid = true
      }
    }
    setValid(isValid)
  }
  useEffect(() => {
    validation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizOptions])

  function countHandler() {
    let clickCount = 0
    return function () {
      if (valid) {
        fetchData()
      } else {
        clickCount++
        if (clickCount === 5) {
          setShowModal(true)
          clickCount = 0
        }
      }
    }
  }
  function logoutHandler() {
    dispatch(setLogout())
  }
  const clickHandler = countHandler()
  return (
    <Container>
      <Button className={'btn btn--modal btn--center'} onClick={logoutHandler}>Logout</Button>
      <Title>Are you ready to start the quiz?</Title>
      <div className='title-wrap'>
        <select name="category-select"
          className='btn btn--select'
          onChange={(event) => setQuizOptions({ ...quizOptions, category: event.target.value })}
          defaultValue={'Select Category'}
        >
          <option value="Select Category" disabled>Select Category</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
        </select>

        <select name="amount-select"
          className='btn btn--select'
          onChange={(event) => setQuizOptions({ ...quizOptions, amount: event.target.value })}
          defaultValue={'Select the amount of questions'}
        >
          <option value="Select the amount of questions" disabled >Select the amount of questions</option>
          <option value="5" >5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>

        <select name="difficulty-select"
          className='btn btn--select'
          onChange={(event) => setQuizOptions({ ...quizOptions, difficulty: event.target.value })}
          defaultValue={'Select Difficulty'}
        >
          <option value="Select Difficulty" disabled >Select Difficulty</option>
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <Button
        className={`btn btn--center ${!valid ? 'btn--disabled' : ''}`}
        onClick={clickHandler}
      >
        Get started
      </Button>
      <CSSTransition
        in={showModal}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <Modal
          text={'Select all options!'}
          buttonRequired={false}
          onConfirm={() => setShowModal(false)}
        />
      </CSSTransition>

    </Container >

  )

}
