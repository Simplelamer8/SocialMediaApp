import React from 'react';
import styles from './Dialogs.module.css';
import {NavLink, Navigate} from "react-router-dom"
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';


const Dialogs = (props) => {
    let dialogsPage = props.dialogsPage;
    let dialogsElements = dialogsPage.dialogsData.map((elem) => <DialogItem name={elem.name} id={elem.id}/>);

    let messageElements = dialogsPage.messagesData.map((elem) => <Message message={elem.message} id={elem.id} />)

    let newMessageBody = dialogsPage.newMessageBody;


    return (
        <>
            {props.isAuth === false && <Navigate to="/login" />}
            <div className={styles.dialogs}>
                <div className={styles.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={styles.messages}>
                    <div> {messageElements} </div>
                    <div>
                        <div>
                            <textarea value={newMessageBody} onChange={(e) => props.onNewMessageChange(e.target.value)} placeholder="Enter your message"></textarea>
                        </div>
                        <div>
                            <button onClick={props.onSendMessageClick}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dialogs;