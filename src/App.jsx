import { useSelector } from 'react-redux'
import { StartScreen } from './components/StartScreen/StartScreen'
import { QuizContainer } from './components/QuizContainer/QuizContainer'
import { Loader } from './components/Loader/Loader'
import './scss/index.scss';

function App() {
  const localLoading = useSelector((state) => state.rootSlice.localLoading)
  const quizStarted = useSelector((state) => state.rootSlice.quizStarted)

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

export default App;
