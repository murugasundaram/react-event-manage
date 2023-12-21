import { createSlice } from "@reduxjs/toolkit";

const myChats = [
    {
        name: 'Muruga',
        msg: 'Hi Guys',
        date: '12/12/2023'
    },
    {
        name: 'Psk',
        msg: 'Hi Da',
        date: '12/12/2023'
    },
    {
        name: 'Muruga',
        msg: 'Any plans for weekend?',
        date: '12/12/2023'
    },
    {
        name: 'Bala',
        msg: 'Senbagathoppu pogalama da?',
        date: '12/12/2023'
    },
    {
        name: 'Vel',
        msg: 'Kutralam pogalama da??',
        date: '12/12/2023'
    },
    {
        name: 'Psk',
        msg: 'Tea kudika polam',
        date: '12/12/2023'
    },
    {
        name: 'Muruga',
        msg: 'Ethana per varrenga nu list edunga da, athuku yetha mathiri plan pannalam',
        date: '12/12/2023'
    },
    {
        name: 'Baskar',
        msg: 'Enganalum polam enaku okay',
        date: '12/12/2023'
    },
    {
        name: 'Plani',
        msg: 'Hotel povom da vanga da',
        date: '12/12/2023'
    },
    {
        name: 'Muruga',
        msg: 'Come to Street',
        date: '12/12/2023'
    },
]

const chatSlice = createSlice({
    name : 'chat',
    initialState: {
        allChat : myChats
    },
    reducers : {
        setAllChat(state, action) {
            state.allChat = action.payload.allChat
        },
        updateChat(state, action) {
            console.log(action.payload)
            state.allChat.push(action.payload)
        }
    }
});

export default chatSlice.reducer;
export const chatAction = chatSlice.actions;