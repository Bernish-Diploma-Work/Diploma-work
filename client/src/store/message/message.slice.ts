import { createSlice } from "@reduxjs/toolkit";
import { IinitialState } from "./message.interface";


const initialState:IinitialState = {
    message: '',
    type: ''
}


export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMsg: (state, {payload}) => {
            const {message, status} = payload;
            state.message = message;
            if (Number(status) == 200) state.type = 'success';
            if (Number(status) !== 200) state.type = 'error'
        },
        clearMsg: (state) => {
            state.message = '';
            state.type = '';
        }
    }
})

export default messageSlice.actions;