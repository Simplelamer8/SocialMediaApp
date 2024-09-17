import React from 'react';
import styles from './Dialogs.module.css';
import {NavLink} from "react-router-dom"
import Dialogs from './Dialogs';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogsReducer';
import { connect } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onNewMessageChange: (text) => dispatch(updateNewMessageBodyCreator(text)),
        onSendMessageClick: () => dispatch(sendMessageCreator())
    }
}

const withRedirect = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withRedirect);

export default DialogsContainer;