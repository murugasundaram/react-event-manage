import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../hooks/use-http";

export const fetchForSelectedEvent = createAsyncThunk('get/events', async (eventId, { rejectWithValue }) => {
    try {
        const response = await useHttp({
            url: 'get/events',
            method: 'POST',
            body: {
                event_id: eventId
            }
        });

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addEntryForSelectedEvent = createAsyncThunk('save/events', async (obj, { rejectWithValue }) => {
    try {
        const response = await useHttp({
            url: 'save/events',
            method: 'POST',
            body: {
                event_id: obj.eventId,
                frnd_id: obj.frndId,
                amount: obj.amount,
                is_exclude: obj.isExclude
            }
        });

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const removeEntryForSelectedEvent = createAsyncThunk('delete/events', async (obj, { rejectWithValue }) => {
    try {
        const response = await useHttp({
            url: 'delete/events',
            method: 'POST',
            body: obj
        });

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});


const manageSlice = createSlice({
    name: 'manage',
    initialState: {
        selectedEvent : 0,
        received: [],
        totalReceived: 0,
        pending: [],
        isLoading: true,
        excluded: []
    },
    reducers : {
        setSelectedEvent(state, action) {
            state.selectedEvent = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchForSelectedEvent.pending, (state, action) => {
            state.isLoading = true
            state.selectedEvent = action.meta.arg
        });

        builder.addCase(fetchForSelectedEvent.fulfilled, (state, action) => {
            let data = action.payload.data;

            if(!data.error) {
                state.received = data.received;
                state.pending = data.pending;
                state.totalReceived = data.totalReceived;
                state.excluded = data.excluded;
            }

            state.isLoading = false
        });

        builder.addCase(addEntryForSelectedEvent.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(addEntryForSelectedEvent.fulfilled, (state, action) => {
            let data = action.payload.data;

            if(!data.error) {
                let newObj = data.data;
                let frnd = state.pending.filter(x => x.id == newObj.frndId);
                newObj.frndName = frnd[0] ? frnd[0].name : 'DELETED';
                
                if(newObj.isExclude) {
                    state.excluded.push({id: newObj.frndId, name: newObj.frndName})
                } else {
                    state.received.push(newObj);
                    state.totalReceived = state.totalReceived + newObj.amount;
                }

                state.pending = state.pending.filter(x => x.id != newObj.frndId);
            }

            state.isLoading = false
        });

        builder.addCase(removeEntryForSelectedEvent.fulfilled, (state, action) => {

            let data = action.payload.data;
            console.log(data);

            if(!data.error) {
                let frndObj = data.data;
                state.pending.push(frndObj);
                state.excluded = state.excluded.filter(x => x.id != frndObj.id);
            }

        })
    }
})

export default manageSlice.reducer;
export const manageActions = manageSlice.actions;