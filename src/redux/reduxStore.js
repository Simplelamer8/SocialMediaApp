import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"; 
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import {usersReducer} from "./usersReducer"
import authReducer from "./authReducer";
import {thunk} from "redux-thunk";
import appReducer from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;