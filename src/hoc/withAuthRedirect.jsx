import React from 'react'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {isAuth: state.auth.isAuth};
}

export default function withAuthRedirect(Component) {
  class withRedirect extends React.Component{
    render()
    {
      return (
        <>
          {this.props.isAuth === false && <Navigate to="/login" /> }
          <Component {...this.props} />
        </>
      )
    }
  }
  let connectedWtihRedirect = connect(mapStateToProps)(withRedirect);
  return connectedWtihRedirect;
}
