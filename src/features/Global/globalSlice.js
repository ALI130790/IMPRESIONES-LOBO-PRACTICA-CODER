import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name : "global",
    initialState: {
        value: {
            darkMode: false
        }
    },
    reducers: {
        setDrakMode: (state, {payload}) => {
            state.value.darkMode = payload
        }
    }
})

export const {setDrakMode} = globalSlice.actions
export default globalSlice.reducer


