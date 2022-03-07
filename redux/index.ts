import { 
    createStore, 
} from "redux";

import { reducers } from "./reducers";
import { persistReducer, persistStore  } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const reducerPersisted = persistReducer({
    key: "root",
    storage,
    blacklist: [ "tempBoard" ],
}, reducers);

const store = createStore(reducerPersisted);

const persistor = persistStore(store as any);

export { persistor };

export default store; 
