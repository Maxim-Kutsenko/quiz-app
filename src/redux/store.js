import { configureStore } from '@reduxjs/toolkit'
import appReducer  from './rootSlice'

export const store = configureStore({
    reducer: {
        rootSlice:appReducer
    }
})