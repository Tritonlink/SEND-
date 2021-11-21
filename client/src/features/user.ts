import {createSlice} from '@reduxjs/toolkit'
import { RootState } from '../app/store';

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
        
    }
})

export const {} = counter 
export const selectCount = (state: RootState) => state.counter.value
export default counter.reducer