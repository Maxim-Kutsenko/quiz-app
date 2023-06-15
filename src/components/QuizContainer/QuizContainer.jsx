import { useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAnalytic,  setAnswersCount, updateCount } from '../../redux/rootSlice'
import { FinishScreen } from '../FinishSceen/FinishScreen';
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import {Title} from '../Title/Title'
import styled from 'styled-components';
import { cssVariables } from '../cssVariables';


const ButtonWrap = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ArrowWrap = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    display: flex;
    width: 50%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  
    @media(max-width:${cssVariables.$tableScreen}) {
      width: 80%;
    }
  
    @media(max-width:${cssVariables.$phoneMiddleScreen}) {
      width: 100%;
    }
`
const QuizStatus = styled.div`
    font-size:20px;
`
const QuizIndex = styled.span`
    position: absolute;
    left: 10px;
`
export const QuizContainer = () => {
    const quizList = useSelector((state) => state.rootSlice.quizList)
    const count = useSelector((state) => state.rootSlice.count)
    const analytic = useSelector((state) => state.rootSlice.analytic)

    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()

    useLayoutEffect(() => {
        if (count === quizList.length) {
            setLoading(true);
            dispatch(setAnswersCount(analytic))
        }
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [count, quizList.length]);

    function nextClickHandler() {
        if (count === quizList.length - 1) {
            setShowModal(true)
        } else {
            dispatch(updateCount(1))
        }
    }
    function prevClickHandler() {
        dispatch(updateCount(-1))
    }
    function analyticHandler(id) {
        let correctId = quizList[count].correctIndex
        let isCorrect = correctId === id
        dispatch(setAnalytic({
            correct: isCorrect,
            activeId: id
        }))
    }

    function finishQuiz() {
        if (!loading) {
            return (
                <SwitchTransition>
                    <CSSTransition
                        key={loading}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <FinishScreen />
                    </CSSTransition>
                </SwitchTransition>
            )
        }
        return (

            <SwitchTransition>
                <CSSTransition
                    key={loading}
                    timeout={500}
                    classNames="fade"
                    unmountOnExit
                >
                    <Loader textRequired={true} text={'Processing the result, please wait'} />
                </CSSTransition>
            </SwitchTransition>

        )
    }
    function renderQuiz() {
        return (
            <SwitchTransition>
                <CSSTransition
                    key={count}
                    timeout={500}
                    classNames="fade"
                    unmountOnExit
                >
                    <div>
                        <Title>{quizList[count]?.question}</Title>
                        <ButtonWrap>
                            {quizList[count]?.answers.map((item, index) =>
                                <Button
                                    active={quizList[count].activeId === index}
                                    key={index}
                                    onClick={() => analyticHandler(index)}
                                >
                                  <QuizIndex>{index+1}.</QuizIndex> {item}
                                </Button>
                            )}
                            <ArrowWrap>
                                <Button
                                    navBtn
                                    disabled={count <= 0}
                                    onClick={prevClickHandler}
                                >
                                    {'< Back'}
                                </Button>
                                <QuizStatus>
                                    {window.innerWidth < 630 ?
                                        `${count + 1} / ${quizList.length}`
                                        :
                                        `Question  ${count + 1} of ${quizList.length}`
                                    }
                                </QuizStatus>
                                <Button
                                    navBtn
                                    onClick={nextClickHandler}
                                    disabled={quizList[count].activeId === undefined}
                                >
                                    {count + 1 !== quizList.length ? 'Next >' : 'Complete'}
                                </Button>   
                            </ArrowWrap>

                        </ButtonWrap>
                        <CSSTransition
                            in={showModal}
                            classNames="fade"
                            timeout={500}
                            unmountOnExit
                        >
                            <Modal
                                text={'Finish the quiz?'}
                                buttonRequired={true}
                                onCancel={() => setShowModal(false)}
                                onConfirm={() =>  dispatch(updateCount(1))}
                            />
                        </CSSTransition>
                    </div>
                </CSSTransition>
            </SwitchTransition>
        )
    }

    return (
        <>{count !== quizList.length ? renderQuiz() : finishQuiz()}</>
    )
}
