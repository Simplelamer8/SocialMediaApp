import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

let c1 = "item";
let c2 = "active";
// "item active"
let classes = c1 + " " + c2;
let classesNew = `${s.item} ${c2}`;


const Navbar = () => {
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to='/profile' className={ ({isActive}) => (isActive ? s.activeLink : s.item) }>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/dialogs' className={ ({isActive}) => (isActive ? s.activeLink : s.item) }>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/users' className={ ({isActive}) => (isActive ? s.activeLink : s.item) }>Users</NavLink>
        </div>
        <div className={s.item}>
            <NavLink>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink>Settings</NavLink>
        </div>
    </nav>
}

export default Navbar;