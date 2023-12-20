import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useHttp from "../hooks/use-http";

export const fetchFrnds = createAsyncThunk('frnd/list', async (_, { rejectWithValue }) => {
    try {
        const response = useHttp({
            url: 'friend/list',
        });

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addFrnds = createAsyncThunk('frnd/add', async (frndName, { rejectWithValue }) => {
    try {
        const response = useHttp({
            url: 'friend/add',
            method: 'POST',
            body: {
                "name" : frndName
            }
        });

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const deleteFrnds = createAsyncThunk('frnd/delete', async (frndId, { rejectWithValue }) => {
    try {
        await useHttp({
            url: 'friend/delete',
            method: 'POST',
            body: {
                "id" : frndId
            }
        });

        return {frndId};
    } catch (error) {
        return rejectWithValue(error);
    }
});

const frndSlice = createSlice({
    name: 'frnd',
    initialState: {
        frnds : [],
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
        builder.addCase(fetchFrnds.pending, (state) => {
          console.log('loading')
        });
    
        builder.addCase(fetchFrnds.fulfilled, (state, action) => {
            if(!action.payload.data.error) {
                state.isFetched = true;
                state.isLoading = false;
                state.frnds = action.payload.data.friends;
            }
        });

        builder.addCase(addFrnds.fulfilled, (state, action) => {
            if(!action.payload.data.error) {
                state.frnds.push(action.payload.data.data)
                state.isNew = 'list'
            }
        });

        builder.addCase(deleteFrnds.fulfilled, (state, action) => {
            state.frnds = state.frnds.filter(x => x.id !== action.payload.frndId)
        });
    
        builder.addCase(fetchFrnds.rejected, (state, action) => {
            console.log('reject', action)
        });
      },
});

export const frndActions = frndSlice.actions;
export default frndSlice.reducer;