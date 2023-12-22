import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../hooks/use-http";

export const fetchChats = createAsyncThunk('chat/list', async (_, { rejectWithValue }) => {
    try {
        const response = useHttp({
            url: 'chat/list',
        });

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addChats = createAsyncThunk('chat/add', async (chatObj, { rejectWithValue }) => {
    try {
        const response = useHttp({
            url: 'chat/add',
            method: 'POST',
            body: chatObj
        });

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const chatSlice = createSlice({
    name : 'chat',
    initialState: {
        allChat : [],
        hasNewMsg: false,
        isLoading: true,
        isFetched: false
    },
    reducers : {
        setAllChat(state, action) {
            state.allChat = action.payload.allChat
        },
        updateChat(state, action) {
            state.hasNewMsg = true
            state.allChat.push(action.payload.newChat)
        },
        readMsg(state) {
            state.hasNewMsg = false
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchChats.fulfilled, (state, action) => {
            if(!action.payload.data.error) {
                state.isFetched = true;
                state.isLoading = false;
                state.allChat = action.payload.data.chats;
            }
        });

        builder.addCase(addChats.fulfilled, (state, action) => {
            // Nothing to do
        })

    }
});

export default chatSlice.reducer;
export const chatAction = chatSlice.actions;