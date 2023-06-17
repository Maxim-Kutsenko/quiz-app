import { useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAnalytic, setAnswersCount, updateCount } from '../../redux/rootSlice'
import { FinishScreen } from '../FinishSceen/FinishScreen';
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { Title } from '../Title/Title'
import './quizContainer.scss'

export const QuizContainer = () => {
    const quizList = useSelector((state) => state.rootSlice.quizList)
    const count = useSelector((state) => state.rootSlice.count)
    const analytic = useSelector((state) => state.rootSlice.analytic)

    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [tempCount, setTempCount] = useState(0)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, quizList.length]);

    function nextClickHandler() {
        if (count === quizList.length - 1) {
            setShowModal(true)
        } else {
            dispatch(updateCount(1))
        }
        if (count === tempCount && count !== quizList.length - 1) {
            setTempCount(prev => prev + 1)
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
        return (<SwitchTransition>
            <CSSTransition
                key={new Date()}
                timeout={500}
                classNames="fade"
                unmountOnExit
            >
                <>
                    {loading ?
                        <Loader textRequired={true} text={'Processing the result, please wait'} />
                        :
                        <FinishScreen />
                    }
                </>
            </CSSTransition>
        </SwitchTransition>)
    }

    function renderQuiz() {
        return (
            <>
                <div className="progress-line" style={{ width: tempCount * (100 / quizList.length) + '%' }}></div>
                <SwitchTransition>
                    <CSSTransition
                        key={count}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div className="quiz-contaier">
                            <Title>{quizList[count]?.question}</Title>
                            <div className="button-wrap">
                                {quizList[count]?.answers.map((item, index) =>
                                    <Button
                                        className={`btn ${quizList[count].activeId === index ? 'active' : ''}`}
                                        id={index}
                                        key={index}
                                        onClick={() => analyticHandler(index)}
                                        quizNumber={true}
                                    >
                                        <div className="quiz-number">{index + 1}.</div>
                                        {item}
                                    </Button>
                                )}
                                <div className="arrow-wrap">
                                    <Button
                                        className={'btn btn--nav'}
                                        disabled={count <= 0}
                                        onClick={prevClickHandler}
                                    >
                                        {'< Back'}
                                    </Button>
                                    <div className='quiz-status'>
                                        {window.innerWidth < 630 ?
                                            `${count + 1} / ${quizList.length}`
                                            :
                                            `Question  ${count + 1} of ${quizList.length}`
                                        }
                                    </div>
                                    <Button
                                        className={'btn btn--nav'}
                                        onClick={nextClickHandler}
                                        disabled={quizList[count].activeId === undefined}
                                    >
                                        {count + 1 !== quizList.length ? 'Next >' : 'Complete'}
                                    </Button>
                                </div>

                            </div>
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
                                    onConfirm={() => dispatch(updateCount(1))}
                                />
                            </CSSTransition>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </>

        )
    }

    return (
        <>{count !== quizList.length ? renderQuiz() : finishQuiz()}</>
    )
}
