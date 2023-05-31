import {Loader} from './components/Loader/Loader';
import { useEffect } from 'react';
import {QuizScreen} from './components/QuizScreen/QuizScreen';
import { useSelector, useDispatch } from 'react-redux'
import { startLoading, finishLoading } from './redux/mainSlice'
import {CSSTransition,SwitchTransition } from 'react-transition-group'

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
      sleep(1000).then(() => {
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

      <SwitchTransition>
        <CSSTransition
          key={new Date()}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <div className='container'>
            {loading ?
              <Loader />
              :
              <QuizScreen />
            }
          </div>
        </CSSTransition>
      </SwitchTransition>


  );
}

export default App;
