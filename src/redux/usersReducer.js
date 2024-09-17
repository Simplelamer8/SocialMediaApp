import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../components/utils/object-helpers";
const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_ACTIVE_PAGE = "users/SET_ACTIVE_PAGE";
const SET_USERS_COUNT = "users/SET_USERS_COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "users/TOGGLE_FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [],
    usersCount: 0,
    pageSize: 5,
    activePage: 1,
    isFetching: false, 
    followingInProgress: [],
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case FOLLOW: 
            return {
                ...state, 
                users: updateObjectInArray(state.users, "id", action.userID, {followed: true}),
                // users: state.users.map((user) => {
                //     if (user.id === action.userID)
                //     {
                //         return {...user, followed: true};   
                //     }
                //     return {...user};
                // })
            }
        case UNFOLLOW:
            return {
                ...state, 
                users: updateObjectInArray(state.users, "id", action.userID, {followed: false}),
                // users: state.users.map((user) => {
                //     if (user.id === action.userID)
                //     {
                //         return {...user, followed: false};   
                //     }
                //     return {...user};
                // })
            }
        case SET_USERS: 
            return {
                ...state, 
                users: [...action.users]
            }
        case SET_ACTIVE_PAGE:
            return {
                ...state, 
                activePage: action.activePage
            }
        case SET_USERS_COUNT:
            return {
                ...state, 
                usersCount: action.usersCount
            }
        case TOGGLE_IS_FETCHING: 
            return {
                ...state, 
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS: 
            return action.following ? 
            {
                ...state, followingInProgress: [...state.followingInProgress, action.userID]
            } 
            : 
            {
                ...state, followingInProgress: state.followingInProgress.filter((elem) => elem != action.userID)
            }
        default:
            return state;
    }
}

export const followSuccess = (id) => {
    return {type: FOLLOW, userID: id};
}

export const unfollowSuccess = (id) => {
    return {type: UNFOLLOW, userID: id};
}

export const setUsers = (users) => {
    return {type: SET_USERS, users}
}

export const setActivePage = (activePage) => {
    return {type: SET_ACTIVE_PAGE, activePage};
}

export const setUsersCount = (usersCount) => {
    return {type: SET_USERS_COUNT, usersCount};
}

export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching};
}

export const toggleFollowingInProgress = (following, userID) => {
    return {type: TOGGLE_FOLLOWING_IN_PROGRESS, following, userID};
}

//thunk...
export const getUsers = (activePage, pageSize) => 
{
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setActivePage(activePage));

        let data = await usersAPI.getUsers(activePage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setUsersCount(data.totalCount));
        console.log(data);
    }
}

const followUnfollowFlow = async(userID, dispatch, followUnfollowFunction, followUnfollowSuccess) => {
    dispatch(toggleFollowingInProgress(true, userID));

    let response = await followUnfollowFunction(userID);
    if (response.data.resultCode === 0)
    {
        dispatch(followUnfollowSuccess(userID));
    }
    dispatch(toggleFollowingInProgress(false, userID));
}

export const follow = (userID) => 
{
    return async (dispatch) => {
        followUnfollowFlow(userID, dispatch, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}

export const unfollow = (userID) => 
    {
        return async (dispatch) => {
            followUnfollowFlow(userID, dispatch, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
        }
    }