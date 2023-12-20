import { configureStore } from "@reduxjs/toolkit";
import eventReducer from './events.store';
import frndReducer from './frnds.store';
import manageReducer from './manage.store';
import authReducer from './auth.store';

const store = configureStore({
    reducer : {
        event : eventReducer,
        frnd : frndReducer,
        manage: manageReducer,
        auth: authReducer,
    }
});

export default store;