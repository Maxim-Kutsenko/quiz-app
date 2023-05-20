import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  quizList: [],
  quizStarted: false,
  count: 0,
  isQuizShow: true,
  analytic: {
    correct: 0,
    wrong: 0
  }

}

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    startLoading:(state)=>{
      state.loading = true
    },
    finishLoading: (state, action) => {
      state.loading = false
      state.quizList = action.payload.sort(() => Math.random() - 0.5).slice(15)
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
    toggleQuiz: (state) => {
      state.isQuizShow = !state.isQuizShow
    },
    correctAnswer :(state) =>{
      state.analytic.correct = state.analytic.correct +1
    },
    wrongAnswer :(state) =>{
      state.analytic.wrong = state.analytic.wrong +1
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { 
  finishLoading,
  startQuiz,
  incrementCount,
  toggleQuiz,
  correctAnswer,
  wrongAnswer,
  startLoading,
  decrementCount
} = mainSlice.actions

export default mainSlice.reducer