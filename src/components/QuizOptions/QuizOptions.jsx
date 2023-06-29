import { useSelector, useDispatch } from "react-redux"
import { findValue } from "../StartScreen/options"
import { setQuizOptions } from "../../redux/rootSlice"
import './quizOptions.scss'


export const QuizOptions = ({ cross }) => {
    const quizOptions = useSelector((state) => state.rootSlice.quizOptions)
    const errorMessage = useSelector((state) => state.rootSlice.errorMessage)
    const dispatch = useDispatch()

    function removeOptionHandler(value) {
        const filteredQuizOptions = Object.keys(quizOptions).reduce((acc, key) => {
            if (!value.includes(key)) {
                acc[key] = quizOptions[key];
            }
            return acc;
        }, {});
        dispatch(setQuizOptions(filteredQuizOptions))
    }
    if (!errorMessage) {
        return (
            <div className="quiz-options">
                {Object.entries(quizOptions).map(([key, value], index) => {
                    return (
                        <div
                            className='quiz-options__item'
                            key={index}
                        >
                            {key} : {key === 'category' ? findValue(+value) : value}
                            {cross && <span className="cross" onClick={() => removeOptionHandler(key)}>x</span>}
                        </div>
                    )
                })}
            </div>
        )
    }
}
