import React from 'react';
import Profile from "./Profile"
import axios from 'axios';
import { connect } from 'react-redux';
import { getStatus, getUserData, updateStatus } from '../../redux/profileReducer';
import withRouter from "./withRouter";
import { usersAPI } from '../../api/api';
import { Navigate } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

export class profileContainer extends React.Component{
    componentDidMount(){
        let userID = this.props.params.userID;
        if (!userID)
        {
            if (this.props.isAuth === false)
            {
                return <Navigate to="/login"/>;   
            }
            userID = this.props.userID;
        }
        this.props.getUserData(userID);
        this.props.getStatus(userID);
    }
    render(){
        return (
            <Profile {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.profilePage.userData,
    status: state.profilePage.status, 
    userID: state.auth.userID,
    isAuth: state.auth.isAuth
});

// let withRedirectComponent = withAuthRedirect(profileContainer);

// export default connect(mapStateToProps, {getUserData})(withRouter(withRedirectComponent));

export default compose(
    connect(mapStateToProps, {getUserData, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)
(profileContainer);