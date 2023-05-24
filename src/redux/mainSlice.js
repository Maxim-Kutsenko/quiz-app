import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  quizList: [],
  quizStarted: false,
  quizAmount: 5,
  readyToStart: false,
  count: 0,
  isQuizShow: true,
  analytic: [],
  answersCount: {}

}

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    finishLoading: (state, action) => {
      state.loading = false
      state.quizList = action.payload
    },
    startQuiz: (state) => {
      state.quizStarted = true
    },
    incrementCount: (state) => {
      state.count = state.count + 1
    },
    decrementCount: (state) => {
      state.count = state.count - 1
    },
    setAnalytic: (state, action) => {
      state.analytic[state.count].correct = action.payload
    },
    setQuizAmount: (state, action) => {
      state.quizAmount = action.payload
      state.quizList = state.quizList.sort(() => Math.random() - 0.5).slice(0, state.quizAmount)
      state.analytic = state.quizList.map(() => ({ correct: null }))
      state.readyToStart = true
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
    }
  },

})

// Action creators are generated for each case reducer function
export const {
  finishLoading,
  startQuiz,
  incrementCount,
  startLoading,
  decrementCount,
  setQuizAmount,
  setAnalytic,
  setAnswersCount
} = mainSlice.actions

export default mainSlice.reducer