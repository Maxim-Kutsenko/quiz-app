import React, { useState, useLayoutEffect } from 'react'
import Button from '../Button/Button'
import { sleep } from '../../App';
import { useSelector, useDispatch } from 'react-redux'
import { startQuiz, incrementCount, correctAnswer, wrongAnswer } from '../../redux/mainSlice'
import { FinishScreen } from '../FinishSceen/FinishScreen';
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Loader from '../Loader/Loader';
import './index.scss'

const QuizScreen = () => {
  const quizStarted = useSelector((state) => state.mainSlice.quizStarted)
  const quizList = useSelector((state) => state.mainSlice.quizList)
  const count = useSelector((state) => state.mainSlice.count)

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    if (count === quizList.length) {
      setLoading(true);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [count, quizList.length]);

  function clickHandler(event) {
    event.target.classList.add('active')
    sleep(500).then(() => {
      dispatch(incrementCount())
      event.target.classList.remove('active')
    })
    let correctId = quizList[count].correctIndex
    let currentId = +event.target.dataset.id

    if (currentId === correctId) {
      dispatch(correctAnswer())
    } else {
      dispatch(wrongAnswer())
    }
  }

  function finishQuiz() {
    if (!loading) {
      return <FinishScreen />
    }
    return <Loader textRequired={true} text={'Обробляємо результат, зачекайте'} />
  }

  return (
    <div className='start-screen'>

      {!quizStarted ? (
        <>
          <h1 className='title'>Готові розпочати тест?</h1>
          <Button text={'Розпочати'} onClick={() => dispatch(startQuiz())} />
        </>
      ) :
        <div className='quiz-container'>
          <h2 className="title">{quizList[count]?.question} </h2>

          <div className="button-wrap">
            {count !== quizList.length ?
              quizList[count]?.answers.map((item, index) =>
                <Button
                  id={index}
                  text={item}
                  key={index}
                  onClick={(event) => clickHandler(event)}
                />
              )
              : finishQuiz()
            }
          </div>
          {count !== quizList.length && <span className='quiz-status'>Питання {count + 1} з {quizList.length}</span>}
        </div>
      }

    </div>
  )
}

export default QuizScreen