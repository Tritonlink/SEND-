import {createSlice} from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

interface hh {
    value:number
}

const initialState:hh = {
    value: 0
}

const counter = createSlice({
    name: "counter",
    initialState,
    reducers:  {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        returnTo0: (state) => {
            state.value = 0
        }
    }
})

export const {increment, decrement, returnTo0} = counter.actions
export const selectCount = (state: RootState) => state.counter.value
export default counter.reducer