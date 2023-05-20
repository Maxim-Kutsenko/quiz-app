import Loader from './components/Loader/Loader';
import { useEffect} from 'react';
import QuizScreen from './components/QuizScreen/QuizScreen';
import { useSelector, useDispatch } from 'react-redux'
import { startLoading, finishLoading } from './redux/mainSlice'
import './scss/reset.scss';
import './scss/index.scss';

export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function App() {
  const loading = useSelector((state) => state.mainSlice.loading)

  const dispatch = useDispatch()

  async function fetchData() {
    dispatch(startLoading())
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
        dispatch(finishLoading(data.questions))
      })
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
          <QuizScreen />
        }
      </div>
    </>
  );
}

export default App;
