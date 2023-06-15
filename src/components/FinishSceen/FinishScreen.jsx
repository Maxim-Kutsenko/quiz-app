import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../Button/Button'
import { Title } from '../Title/Title'
import { CSSTransition } from 'react-transition-group'
import './finishScreen.scss'

export const FinishScreen = () => {
  const answersCount = useSelector((state) => state.rootSlice.answersCount)
  const quizList = useSelector((state) => state.rootSlice.quizList)
  const [showAnswers, setShowAnswers] = useState(false)

  function showAnswersHandler() {
    setShowAnswers(true)
    document.body.classList.add('finish-screen')
  }
  return (
    <>
      {!showAnswers &&
        <div>
          <Title>Quiz completed!</Title>
          <div>
            <div className='analytic'>Correct answers: <span style={{ color: 'blue' }}>{answersCount.correct}</span></div>
            <div className='analytic'>Wrong answers: <span style={{ color: '#ff0000' }}>{answersCount.wrong}</span></div>
          </div>
          <Button className={'btn btn--center'}  onClick={showAnswersHandler} >Show answers</Button>
          <Button className={'btn btn--center'}  onClick={() => window.location.reload()}>New quiz</Button>
        </div>}
      <CSSTransition
        in={showAnswers}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <>
          <div className='answers-wrap'>
            {quizList.map((item, index) => {
              let isCorrect = item.correctIndex === item.activeId
              return (
                <div className={`answers ${isCorrect ? 'answers--correct' : 'answers--wrong'}`} key={index}>
                  <div>{index + 1}. {item.question}</div>
                  <div>You answered: <span>
                    {item.answers[item.activeId]}
                  </span> - <span style={{ color: isCorrect ? '#1149a7' : '#ff0000' }}>{isCorrect ? 'correct' : 'wrong'}</span>
                  </div>
                  {!isCorrect && <div >The correct answer is: <span>{item.answers[item.correctIndex]}</span></div>}
                </div>
              )
            })}
          </div>
          <Button className={'btn btn--center'} onClick={() => window.location.reload()}>New quiz</Button>
        </>
      </CSSTransition>
    </>
  )
}

