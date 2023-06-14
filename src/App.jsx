import {Loader} from './components/Loader/Loader';
import { useEffect } from 'react';
import {QuizScreen} from './components/QuizScreen/QuizScreen';
import { useSelector, useDispatch } from 'react-redux'
import { startLoading, finishLoading } from './redux/rootSlice'
import {CSSTransition,SwitchTransition } from 'react-transition-group'
import { cssVariables } from './components/cssVariables';
import styled from 'styled-components';
import './scss/index.scss';

const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  text-align: center;

  @media(max-width:${cssVariables.$middleScreen} ) {
    max-width: 960px;
  }

  @media(max-width:${cssVariables.$phoneMiddleScreen} ) {
    padding: 0 20px;
    max-width: none;
  }

  @media(max-width:${cssVariables.$phoneScreen}) {
    padding: 0 10px;
  }
`
export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function App() {
  const loading = useSelector((state) => state.rootSlice.loading)

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
          <Container>
            {loading ?
              <Loader />
              :
              <QuizScreen />
            }
          </Container>
        </CSSTransition>
      </SwitchTransition>


  );
}

export default App;
