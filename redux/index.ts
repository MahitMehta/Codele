import { 
    createStore, 
} from "redux";
import {createWrapper } from 'next-redux-wrapper';

import { reducers } from "./reducers";
import { persistReducer, persistStore  } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const reducerPersisted = persistReducer({
    key: "root",
    storage,
    blacklist: [ "tempBoard" ],
}, reducers);

const store = createStore<any, any, unknown, unknown>(reducerPersisted);

const persistor = persistStore(store as any);

const makeStore = () => {
    (store as any).__persistor = persistStore(store as any);
    return store; 
}

export const wrapper = createWrapper(makeStore);

export { persistor };

export default store;
