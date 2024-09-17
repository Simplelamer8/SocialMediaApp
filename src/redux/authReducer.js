import { authAPI } from "../api/api";
const SET_USER_CREDENTIALS = "auth/SET_USER_CREDENTIALS";//Change the string and you will get what you want, I guess it has to do with same string value in file profileReducer.js

let initialState = {
    userId: null,
    email: null, 
    login: null, 
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER_CREDENTIALS:
        {
            return {
                ...state, 
                ...action.data, 
                isAuth: action.data.isAuth
            }
        }
        default:
            return state;
    }
}

export const setUserData = (userID, email, login, isAuth) => {
    return {type: SET_USER_CREDENTIALS, data: {userID, email, login, isAuth}}
}

export const getUserData = () => async(dispatch) => {
    let response =  await authAPI.me();

    if (response.data.resultCode === 0)
    {
        let {id, login, email} = response.data.data;
        dispatch(setUserData(id, email, login, true));   
    }
}

export const login = (email, password, rememberMe, showError) => async(dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
    
    if (response.data.resultCode === 0)
    {
        dispatch(getUserData());
    }
    else 
    {
        showError(true);
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    
    if (response.data.resultCode === 0)
    {
        dispatch(setUserData(null, null, null, false));
    }
}

export default authReducer;