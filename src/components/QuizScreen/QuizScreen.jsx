import { useSelector } from 'react-redux'
import { QuizContainer } from '../QuizContainer/QuizContainer';
import { StartQuizScreen } from '../StartQuizScreen/StartQuizScreen';
import { CSSTransition, SwitchTransition } from 'react-transition-group'


 export const QuizScreen = () => {
  const quizStarted = useSelector((state) => state.rootSlice.quizStarted)
  return (
    <>
      <SwitchTransition>
        <CSSTransition
          key={new Date()}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          {!quizStarted ?
            <StartQuizScreen />
            :
            <QuizContainer />
          }
        </CSSTransition >
      </SwitchTransition>
    </>

  )
}

