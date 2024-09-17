import { createSelector } from "reselect";

const getUsersSimpleSelector = (state) => {
    return state.usersPage.users;
}

export const getUsersCountSelector = (state) => {
    return state.usersPage.usersCount;
}

export const getPageSizeSelector = (state) => {
    return state.usersPage.pageSize;
}

export const getActivePageSelector = (state) => {
    return state.usersPage.activePage;
}

export const getIsFetchingSelector = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgressSelector = (state) => {
    return state.usersPage.followingInProgress;
}