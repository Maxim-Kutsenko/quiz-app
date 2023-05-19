import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setQuizList: (state, action) => {
      state.quizList = action.payload
    },
    startQuiz: (state) => {
      state.quizStarted = true
    },
    incrementCount: (state) => {
      state.count = state.count + 1
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
  setQuizList,
  startQuiz,
  incrementCount,
  toggleQuiz,
  correctAnswer,
  wrongAnswer
} = mainSlice.actions

export default mainSlice.reducer