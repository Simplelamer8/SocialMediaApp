import { profileAPI, usersAPI } from "../api/api";
const UDPATE_NEW_POST_TEXT = "profile/UPDATE-NEW-POST-TEXT";
const ADD_POST = "profile/ADD-POST";
const SET_USER_DATA = "profile/SET_USER_DATA";
const SET_STATUS = "profile/SET_STATUS";
const DELETE_POST = "profile/DELETE_POST";

let initialState = {
    postsData: [
        {id:1, message:"Hi, how are you?", likesCount:12},
        {id:2, message:"It's my first post", likesCount:21},
    ],
    newPostText: "it-kamasutra.com",
    userData: null,
    status: ""
};

const profileReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case ADD_POST:
        {
            let obj = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {...state, postsData: [...state.postsData, obj], newPostText: "", };
        }
        case UDPATE_NEW_POST_TEXT:
        {
            return {...state, newPostText: action.newText};
        }
        case SET_USER_DATA:
        {
            return {...state, userData: action.userData};
        }
        case SET_STATUS: 
        {
            return {...state, status: action.status};
        }
        case DELETE_POST: 
        {
            return {...state, postsData: state.postsData.filter((elem) => elem.id != action.id)};
        }
        default:
            return state;
    }
}

export function addPostActionCreator(newPostText)
{
    return {type: ADD_POST, newPostText};
}

export function setStatusActionCreator(status)
{
    return {type: SET_STATUS, status};
}

export function updateNewPostTextActionCreator(newPostElement)
{
    return {
        type: UDPATE_NEW_POST_TEXT, 
        newText: newPostElement
    };
}

export const setUserData = (userData) => {
    return {type: SET_USER_DATA, userData};
}

export const deletePost = (id) => {
    return {type: DELETE_POST, id};
}

//thunk
export const getUserData = (userID) => async (dispatch) => {
    let response = await usersAPI.getProfile(userID)
    dispatch(setUserData(response.data));
}

export const getStatus = (userID) => async (dispatch) => {
    let response = await profileAPI.getStatus(userID);
    dispatch(setStatusActionCreator(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0)
    {
        dispatch(setStatusActionCreator(status));
    }
}

export default profileReducer;