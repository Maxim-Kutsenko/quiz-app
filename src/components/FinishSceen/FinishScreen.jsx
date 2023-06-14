import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../Button/Button'
import { Title } from '../Title/Title'
import { CSSTransition } from 'react-transition-group'
import { cssVariables } from '../cssVariables'
import styled, { css } from 'styled-components'


const Analytic = styled.div`
    margin-bottom: 20px;
    font-size: 20px;
`
const AnswersWrap = styled.div`
  text-align: initial;
    margin: 0 auto;
    width: 50%;
    font-size: 16px;
  
    @media(max-width:${cssVariables.$tableScreen}) {
      width: 80%;
    }
  
    @media(max-width: ${cssVariables.$phoneMiddleScreen}) {
      width: 100%;
    }
`
const Answers = styled.div`
    margin-bottom: 10px;
    border: 1px solid;
    padding: 10px;
    border-radius: 10px;
    ${props => props.correct && css`
      border-color:${cssVariables.$uiBackground} ;
    `}
    ${props => props.wrong && css`
    border-color: #ff0000; ;
    `}
    div {
      margin-bottom: 5px;
    }
`
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
            <Analytic>Correct answers: <span style={{ color: 'blue' }}>{answersCount.correct}</span></Analytic>
            <Analytic>Wrong answers: <span style={{ color: '#ff0000' }}>{answersCount.wrong}</span></Analytic>
          </div>
          <Button
            center
            onClick={showAnswersHandler}
          >
            Show answers
          </Button>
          <Button
            center
            onClick={() => window.location.reload()}
          >
            New quiz
          </Button>
        </div>}
      <CSSTransition
        in={showAnswers}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <>
          <AnswersWrap>
            {quizList.map((item, index) => {
              let isCorrect = item.correctIndex === item.activeId
              return (
                <Answers correct={isCorrect} wrong={!isCorrect} key={index}>
                  <div>{index + 1}. {item.question}</div>
                  <div>You answered: <span>
                    {item.answers[item.activeId]}
                  </span> - <span style={{ color: isCorrect ? '#1149a7' : '#ff0000' }}>{isCorrect ? 'correct' : 'wrong'}</span>
                  </div>
                  {!isCorrect && <div >The correct answer is: <span>{item.answers[item.correctIndex]}</span></div>}
                </Answers>
              )
            })}
          </AnswersWrap>
          <Button
            center
            onClick={() => window.location.reload()}
          >
            New quiz
          </Button>
        </>
      </CSSTransition>
    </>
  )
}

