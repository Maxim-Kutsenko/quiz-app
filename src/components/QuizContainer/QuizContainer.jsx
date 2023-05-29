import React, { useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementCount, setAnalytic, decrementCount, setAnswersCount } from '../../redux/mainSlice'
import { FinishScreen } from '../FinishSceen/FinishScreen';
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Loader from '../Loader/Loader';
import Button from '../Button/Button'
import '../../scss/index.scss'

export const QuizContainer = () => {
    const quizList = useSelector((state) => state.mainSlice.quizList)
    const count = useSelector((state) => state.mainSlice.count)
    const analytic = useSelector((state) => state.mainSlice.analytic)

    const [loading, setLoading] = useState(false)

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
            if (!window.confirm('Завершити тест?')) {
                return false
            }
        }
        dispatch(incrementCount())
    }
    function prevClickHandler() {
        dispatch(decrementCount())
    }
    function analyticHandler(event, id) {
        let correctId = quizList[count].correctIndex
        let currentId = +event.target.dataset.id
        let isCorrect = correctId === currentId
        dispatch(setAnalytic({
            correct: isCorrect,
            activeId: currentId
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
                    <Loader textRequired={true} text={'Обробляємо результат, зачекайте'} />
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
                    <div className="quiz-contaier">
                        <h2 className="title">{quizList[count]?.question}</h2>
                        <div className="button-wrap">
                            {quizList[count]?.answers.map((item, index) =>
                                <Button
                                    className={`btn ${quizList[count].activeId === index ? 'active' : ''}`}
                                    id={index}
                                    text={item}
                                    key={index}
                                    onClick={(event) => analyticHandler(event, index)}
                                    quizNumber={true}
                                />
                            )}
                            <div className="arrow-wrap">
                                <Button text={'< Назад'}
                                    className={'btn btn--nav'}
                                    disabled={count <= 0}
                                    onClick={prevClickHandler}
                                />
                                <div className='quiz-status'>
                                    {window.innerWidth < 630 ?
                                        `${count + 1} / ${quizList.length}`
                                        :
                                        `Питання ${count + 1} з ${quizList.length}`
                                    }
                                </div>

                                <Button text={count + 1 !== quizList.length ? 'Далі >' : 'Завершити'}
                                    className={'btn btn--nav'}
                                    onClick={nextClickHandler}
                                    disabled={quizList[count].activeId === undefined}
                                />
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </SwitchTransition>
        )
    }

    return (
        <>{count !== quizList.length ? renderQuiz() : finishQuiz()}</>
    )
}
