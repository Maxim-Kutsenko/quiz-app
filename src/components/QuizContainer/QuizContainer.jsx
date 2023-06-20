import { useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAnalytic, setAnswersCount, updateCount } from '../../redux/rootSlice'
import { FinishScreen } from '../FinishSceen/FinishScreen';
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Modal } from '../Modal/Modal'
import { Title } from '../Title/Title'
import './quizContainer.scss'
const he = require('he')
export const QuizContainer = () => {
    const quizList = useSelector((state) => state.rootSlice.quizList)
    const count = useSelector((state) => state.rootSlice.count)
    const analytic = useSelector((state) => state.rootSlice.analytic)
    const errorMessage = useSelector((state) => state.rootSlice.errorMessage)

    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const [progressCount, setProgressCount] = useState(0)
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
        if (count === progressCount && count !== quizList.length - 1) {
            setProgressCount(prev => prev + 1)
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
                <Container>
                    {loading ?
                        <Loader textRequired={true} text={'Processing the result, please wait'} />
                        :
                        <FinishScreen />
                    }
                </Container>
            </CSSTransition>
        </SwitchTransition>)
    }

    function renderQuiz() {
        return (
            <Container>
                {errorMessage && <div className='error-message'>{errorMessage}</div>}
                <div className="progress-line" style={{ width: progressCount * (100 / quizList.length) + '%' }}></div>
                <SwitchTransition>
                    <CSSTransition
                        key={count}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div className="quiz-contaier">
                            <Title>{he.decode(quizList[count]?.question) }</Title>
                            <div className="button-wrap">
                                {quizList[count]?.answers.map((item, index) =>
                                    <Button
                                        className={`btn ${quizList[count].activeId === index ? 'active' : ''}`}

                                        key={index}
                                        onClick={() => analyticHandler(index)}
                                    >
                                        <div className="quiz-number">{index + 1}.</div>
                                        {he.decode(item)}
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
            </Container>
        )
    }

    return (
        <>{count !== quizList.length ? renderQuiz() : finishQuiz()}</>
    )
}
