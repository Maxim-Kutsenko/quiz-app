import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  quizList: [],
  quizStarted: false,
  quizAmount: 0,
  count: 0,
  isQuizShow: true,
  analytic: [],
  answersCount: {}

}

export const rootSlice = createSlice({
  name: 'rootSlice',
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
  updateCount,
  startLoading,
  decrementCount,
  setQuizAmount,
  setAnalytic,
  setAnswersCount,
  
} = rootSlice.actions

export default rootSlice.reducer