import React from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
  return (
    <div>
      {/* <div>
        <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' />
      </div> */}
      <img src={props.userData.photos.large} alt="" />
      <div className={s.descriptionBlock}>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo;