import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderComponent from "./components/Header/HeaderComponent"
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import withRouter from './components/Profile/withRouter';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';

class App extends React.Component{

  componentDidMount()
  {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.isInitialized)
    {
      return <h1>The web-application is initializing, please wait...</h1> 
    }
    return (
      <div className='app-wrapper'>
        <HeaderComponent/>
        <Navbar />
        {/* <Profile /> */}
        <div className='app-wrapper-content'>
            <Routes>
                <Route path="/profile/:userID?" element={<ProfileContainer />}/>
                <Route path="/dialogs" element={<DialogsContainer />}/>
                <Route path='/users' element={<UsersContainer />}/>
                <Route path='/login' element={<Login />}/>
            </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {isInitialized: state.app.initialized};
}

let AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

let SamuraiJSApp = (props) => {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp;