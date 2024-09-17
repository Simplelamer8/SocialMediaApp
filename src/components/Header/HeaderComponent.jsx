import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux';
import { getUserData, logout } from '../../redux/authReducer';
import axios from 'axios';
import { authAPI } from '../../api/api';
import { compose } from 'redux';

export class HeaderComponent extends Component {
  render() {
    return (
        <Header {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login 
});

// export default connect(mapStateToProps, {getUserData})(HeaderComponent);

export default compose(connect(mapStateToProps, {logout}))(HeaderComponent);