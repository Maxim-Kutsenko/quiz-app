import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'
import { sleep } from '../../App';
import { useSelector, useDispatch } from 'react-redux'
import { startQuiz, incrementCount, correctAnswer, wrongAnswer } from '../../redux/mainSlice'
import './index.scss'
import Loader from '../Loader/Loader';

const QuizScreen = () => {
  const quizStarted = useSelector((state) => state.mainSlice.quizStarted)
  const quizList = useSelector((state) => state.mainSlice.quizList)
  const isQuizShow = useSelector((state) => state.mainSlice.isQuizShow)
  const analytic = useSelector((state) => state.mainSlice.analytic)
  const count = useSelector((state) => state.mainSlice.count)

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Показать компонент 1
    if(count === quizList.length){
      setLoading(true);
    }

    // Через 2 секунды скрыть компонент 1 и показать компонент 2
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Очистить таймер при размонтировании компонента
    return () => clearTimeout(timer);
  }, [count, quizList.length]);

  function clickHandler(event) {
    event.target.classList.add('active')
    sleep(500).then(() => {
      dispatch(incrementCount())
      event.target.classList.remove('active')
    })

    let correct = quizList[count].correctIndex
    let id = event.target.dataset.id

    if (+id === correct) {
      dispatch(correctAnswer())
    } else {
      dispatch(wrongAnswer())
    }
  }

  function finishQuiz() {
    if (!loading) {
      return (
        <>
          <h1 className='title'>Вітаємо, тест закінчено!</h1>
          <div>
            <div className='analytic'>Правильних відповідей: <span style={{ color: 'blue' }}>{analytic.correct}</span></div>
            <div className='analytic'>Не правильних відповідей: <span style={{ color: 'red' }}>{analytic.wrong}</span></div>
          </div>
        </>
      )
    }

    return <Loader />

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
          {count !== quizList.length && <span>{count + 1}/{quizList.length}</span>}
        </div>


      }

    </div>
  )
}

export default QuizScreen