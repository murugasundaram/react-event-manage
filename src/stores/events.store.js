import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useHttp from "../hooks/use-http";

export const fetchEvents = createAsyncThunk('event/list', async (_, { rejectWithValue }) => {
    try {
        const response = useHttp({
            url: 'event/list',
        });

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addEvents = createAsyncThunk('event/add', async (eventName, { rejectWithValue }) => {
    try {
        const response = useHttp({
            url: 'event/add',
            method: 'POST',
            body: {
                "name" : eventName
            }
        });

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const deleteEvents = createAsyncThunk('event/delete', async (eventId, { rejectWithValue }) => {
    try {
        await useHttp({
            url: 'event/delete',
            method: 'POST',
            body: {
                "id" : eventId
            }
        });

        return {eventId};
    } catch (error) {
        return rejectWithValue(error);
    }
});

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        events : [],
        isNew : 'list',
        isFetched : false,
        isLoading : true
    },
    reducers: {
        setIsNew(state, action) {
            state.isNew = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.pending, (state) => {
          console.log('loading')
        });
    
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            if(!action.payload.data.error) {
                state.isFetched = true;
                state.isLoading = false;
                state.events = action.payload.data.events;
            }
        });

        builder.addCase(addEvents.fulfilled, (state, action) => {
            if(!action.payload.data.error) {
                state.events = [
                    action.payload.data.data,
                    ...state.events
                ];
                
                state.isNew = 'list'
            }
        });

        builder.addCase(deleteEvents.fulfilled, (state, action) => {
            state.events = state.events.filter(x => x.id !== action.payload.eventId)
        });
    
        builder.addCase(fetchEvents.rejected, (state, action) => {
            console.log('reject', action)
        });
      },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;