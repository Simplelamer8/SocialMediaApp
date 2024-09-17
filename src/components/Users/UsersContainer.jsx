import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import UsersAPIComponent from "./UsersAPIComponent";
import { follow, getUsers, setActivePage, setUsers, setUsersCount, toggleFollowingInProgress, toggleIsFetching, unfollow } from '../../redux/usersReducer';
import Users from './Users';
import { usersAPI } from '../../api/api';
import { Navigate } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getActivePageSelector, getFollowingInProgressSelector, getIsFetchingSelector, getPageSizeSelector, getUsersCountSelector, getUsersSelector } from '../../redux/usersSelectors';

export class UsersC extends React.Component {
    componentDidMount(props){
        this.props.getUsers(this.props.activePage, this.props.pageSize);
    }

    getNewPageUsers = (pageNumber) =>
    {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return(
            <>
                {this.props.isFetching && <h2>Fetching data, please wait...</h2>}
                {this.props.isAuth === false && <Navigate to="/login" />}
                <Users getNewPageUsers={this.getNewPageUsers} activePage={this.props.activePage} 
                    users={this.props.users} unfollow={this.props.unfollow} follow={this.props.follow} 
                    usersCount={this.props.usersCount} pageSize={this.props.pageSize} 
                    toggleFollowingInProgress={this.props.toggleFollowingInProgress} followingInProgress={this.props.followingInProgress}
                />
        </>
    )
    }
}


const mapStateToProps = (state) => 
{
    console.log(state.usersPage);
    return {
        users: getUsersSelector(state),
        usersCount: getUsersCountSelector(state),
        pageSize: getPageSizeSelector(state),
        activePage: getActivePageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
    };
}
// const mapDispatchToProps = (dispatch) => 
// {
//     return {
//         follow: followActionCreator,
//         unfollow: unfollowActionCreator,
//         setUsers: setUsersActionCreator,
//         setActivePage: setActivePageActionCreator,
//         setUsersCount: setUsersCountActionCreator, 
//         toggleIsFetching: toggleIsFetchingActionCreator
//     };
// }

// const withRedirect = withAuthRedirect(UsersC);

// export default connect(mapStateToProps, {
//     follow,
//     unfollow,
//     setActivePage,
//     toggleFollowingInProgress,
//     getUsers
// })(withRedirect);

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setActivePage,
        toggleFollowingInProgress,
        getUsers
    }),
    withAuthRedirect
)(UsersC);