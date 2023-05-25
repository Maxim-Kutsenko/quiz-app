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
    const [activeButtonId, setActiveButtonId] = useState(null);

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
        dispatch(incrementCount())
        setActiveButtonId(null)
    }
    function prevClickHandler() {
        dispatch(decrementCount())

    }
    function analyticHandler(id) {
        setActiveButtonId(id)
        let correctId = quizList[count].correctIndex
        let currentId = id
        let isCorrect = correctId === currentId
        dispatch(setAnalytic(isCorrect))
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
                                    className={`btn ${activeButtonId === index ? 'active' : ''}`}
                                    id={index}
                                    text={item}
                                    key={index}
                                    onClick={() => analyticHandler( index)}
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
                                    disabled={activeButtonId === null}
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
