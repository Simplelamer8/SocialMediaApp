import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from "./Users.module.css"
import maleUser from "../../assets/images/maleUser.png"
import axios from 'axios';
import { usersAPI } from '../../api/api';

export default function Users(props) {
    let pagesCount = Math.ceil(props.usersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++)
    {
        pages.push(i);   
    }
    console.log(props);
    return (
    <>
        {
            pages.map((page) => {
                return <span onClick={() => props.getNewPageUsers(page)} className={page === props.activePage && styles.activePage}>{page}</span>
            })
        }
        <div className={styles.users}>
            {
            props.users.map((user) => (
                <div className={styles.card} key={user.id}>
                <div className={styles.avatar}>
                    <NavLink to={`/profile/${user.id}`}>
                        <img src={user.photos.small ? user.photos.small : maleUser} alt="" />
                    </NavLink>
                    {
                    user.followed ? 
                        <button disabled={props.followingInProgress.some((elem) => elem === user.id)} onClick={() =>
                            { 
                                props.unfollow(user.id);
                            }
                        }>Unfollow</button>
                    : 
                        <button disabled={props.followingInProgress.some((elem) => elem === user.id)} onClick={() => 
                            {
                                props.follow(user.id);
                            }
                        }>Follow</button>
                    }
                </div>
                <div className={styles.textInfo}>
                    <div className={styles.left}>
                    <p>{user.name}</p>
                    <p>{user.status}</p>
                    </div>
                    <div className={styles.right}>
                    <p>{"user.location.city"}</p>
                    <p>{"user.location.country"}</p>
                    </div>
                </div>
                </div>
            ))
            }
        </div>
    </>
    )
}
