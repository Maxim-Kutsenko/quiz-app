import React from 'react'
import { useSelector } from 'react-redux'
import {Button} from '../Button/Button'
import '../../scss/index.scss'

export const FinishScreen = () => {
  const answersCount = useSelector((state) => state.mainSlice.answersCount)
  const quizList = useSelector((state) => state.mainSlice.quizList)
  const [showAnswers, setShowAnswers] = React.useState(false)

  function showAnswersHandler() {
    setShowAnswers(true)
    document.body.classList.add('finish-screen')
  }
  return (
    <div>

      {!showAnswers ?
        <>
          <h1 className='title'>Тест закінчено!</h1>
          <div>
            <div className='analytic'>Правильних відповідей: <span style={{ color: 'blue' }}>{answersCount.correct}</span></div>
            <div className='analytic'>Не правильних відповідей: <span style={{ color: '#ff0000' }}>{answersCount.wrong}</span></div>
          </div>
          <Button className={'btn btn--center'} text={'Показати відповіді'} onClick={showAnswersHandler} />
          <Button className={'btn btn--center'} text={'Новий тест'} onClick={() => window.location.reload()} />
        </>
        :
        <>
          <div className='answers-wrap'>
            {quizList.map((item, index) => {
              let isCorrect = item.correctIndex === item.activeId
              return (
                <div className={`answers ${isCorrect ? 'answers--correct': 'answers--wrong'}`} key={index}>
                  <div>{index + 1}. {item.question}</div>
                  <div>Ви відповіли: <span>
                    {item.answers[item.activeId]}
                  </span> - <span style={{color:isCorrect ? '#1149a7' : '#ff0000'}}>{isCorrect ? 'вірно' : 'не вірно'}</span> 
                  </div>
                  {!isCorrect && <div >Правильна відповідь: <span>{item.answers[item.correctIndex]}</span></div>}
                </div>
              )
            })}
          </div>
          <Button className={'btn btn--center'} text={'Новий тест'} onClick={() => window.location.reload()} />
        </>
      }


    </div>
  )
}

