import React, { useRef } from 'react';
import { updateNewPostTextActionCreator, addPostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';


const mapStateToProps = (state) => 
{
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps = (dispatch) => 
{
  return {
    updateNewPostText: (text) => dispatch(updateNewPostTextActionCreator(text)),
    addPost: (newPostText) => dispatch(addPostActionCreator(newPostText))
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;