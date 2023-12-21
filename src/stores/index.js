import { configureStore } from "@reduxjs/toolkit";
import eventReducer from './events.store';
import frndReducer from './frnds.store';
import manageReducer from './manage.store';
import authReducer from './auth.store';
import chatReducer from './chat.store';

const store = configureStore({
    reducer : {
        event: eventReducer,
        frnd: frndReducer,
        manage: manageReducer,
        auth: authReducer,
        chat: chatReducer
    }
});

export default store;