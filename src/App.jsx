import { useSelector } from 'react-redux'
import { StartScreen } from './components/StartScreen/StartScreen'
import { QuizContainer } from './components/QuizContainer/QuizContainer'
import { Loader } from './components/Loader/Loader'
import { AuthScrenn } from './components/AuthScreen/AuthScrenn'
import './scss/index.scss';

function App() {
  const localLoading = useSelector((state) => state.rootSlice.localLoading)
  const quizStarted = useSelector((state) => state.rootSlice.quizStarted)
  const isAuthorized = useSelector((state) => state.rootSlice.isAuthorized)

  const Quiz = () => {
    if (localLoading) {
      return <Loader />
    }
    if (quizStarted) {
      return <QuizContainer />
    }
    if (!quizStarted) {
      return <StartScreen />
    }
  }

  return (
    <>
      {
        isAuthorized ? <Quiz /> : <AuthScrenn />
      }
    </>
  )

}

export default App;
