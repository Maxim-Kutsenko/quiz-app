import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localLoading: false,
  quizStarted: false,
  quizOptions: {},
  quizList: [],
  count: 0,
  analytic: [],
  answersCount: {},
  errorMessage: null,
  isAuthorized: false || localStorage.getItem('loggined'),

}

export const rootSlice = createSlice({
  name: 'rootSlice',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.localLoading = true
    },
    finishLoading: (state, action) => {
      state.localLoading = false
      state.quizStarted = true
      state.quizList = action.payload
      state.quizList = state.quizList.map((item, index) => {
        const incorrectAnswers = item.incorrect_answers;
        const correctAnswer = item.correct_answer;
        const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));

        const newArray = [
          ...incorrectAnswers.slice(0, randomIndex),
          correctAnswer,
          ...incorrectAnswers.slice(randomIndex)
        ];
        return {
          "question": item.question,
          "answers": newArray,
          "correct_answer": item.correct_answer,
          "correctIndex": newArray.indexOf(item.correct_answer)
        }
      })
      state.analytic = state.quizList.map(() => ({ correct: null }))
    },
    setQuizOptions: (state, action) => {
      state.quizOptions = action.payload;
    },
    finishLoadingWithError: (state, action) => {
      state.localLoading = false
      state.quizList = action.payload
      state.quizStarted = true
      state.analytic = state.quizList.map(() => ({ correct: null }))
      state.errorMessage = 'Failed to connect to the server, using local quiz'
    },
    updateCount: (state, action) => {
      const amount = action.payload;
      return {
        ...state,
        count: state.count + amount,
      };
    },
    setAnalytic: (state, action) => {
      const { correct, activeId } = action.payload;
      state.analytic[state.count].correct = correct
      state.quizList[state.count].activeId = activeId
    },
    setActiveId: (state, action) => {
      state.analytic[state.count].activeId = action.payload
    },
    setAnswersCount: (state, action) => {
      state.answersCount = action.payload.reduce((accum, elem) => {
        if (elem.correct) {
          accum.correct += 1
        } else {
          accum.wrong += 1
        }
        return accum
      }, {
        correct: 0,
        wrong: 0
      })
    },
    setAuthorized: (state) => {
      state.isAuthorized = true
    },
    setLogout: (state) => {
      state.isAuthorized = false
      localStorage.removeItem('loggined')
    }
  },

})

// Action creators are generated for each case reducer function
export const {
  finishLoading,
  incrementCount,
  updateCount,
  startLoading,
  decrementCount,
  setQuizOptions,
  setAnalytic,
  setAnswersCount,
  finishLoadingWithError,
  setAuthorized,
  setLogout
} = rootSlice.actions

export default rootSlice.reducer