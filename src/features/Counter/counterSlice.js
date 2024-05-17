import {createSlice} from "@reduxjs/toolkit";

export  const counterSlice = createSlice({
    
    name: "counter",
    initialState: {
        value: 1
    },
    reducers: {
        increment: (state )=> {
            state.value += 1
        },
        decrement: (state) => {
            if (state.value > 1) {
                
                state.value -= 1
            }
        },
        incrementByAmount: (state, {payload}) =>{
            state.value += payload
        },
        reset: (state) => {
            state.value = 1
        }
    }
})

export const { increment, decrement, incrementByAmount, reset}  = counterSlice.actions

export default counterSlice.reducer