import Loader from './components/Loader/Loader';
import { useEffect, useState } from 'react';
import QuizScreen from './components/QuizScreen/QuizScreen';
import { useSelector, useDispatch } from 'react-redux'
import { setQuizList} from './redux/mainSlice'
import { CSSTransition } from "react-transition-group";
import './scss/reset.scss';
import './scss/index.scss';

export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function App() {
  const [loading, setLoading] = useState(false)
  const quizList = useSelector((state) => state.mainSlice.quizList)
  const dispatch = useDispatch()
  
  async function fetchData() {
    setLoading(true)
    try {
      const response = await fetch('./data.json', {
        headers:
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const data = await response.json()
      sleep(1500).then(() => {
        setLoading(false)
        dispatch(setQuizList(data.questions))
      })
      console.log(quizList);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className='container'>
        {loading ?
            <Loader />
          :
          <QuizScreen />}
      </div>
    </>
  );
}

export default App;
