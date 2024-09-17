import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { Navigate } from 'react-router-dom';

const Profile = (props) => {

  if (!props.userData)
  {
    return <p>Fetching data...</p>; 
  }
  if (props.isAuth === false)
  {
    return <Navigate to="/login" />
  }
  return (
    <div className={s.content}>
      <ProfileInfo userData={props.userData} status={props.status} updateStatus={props.updateStatus} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile;