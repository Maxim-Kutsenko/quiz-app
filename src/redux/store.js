import { configureStore } from '@reduxjs/toolkit'
import appReducer  from './mainSlice'

export const store = configureStore({
    reducer: {
        mainSlice:appReducer
    }
})