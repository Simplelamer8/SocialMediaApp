const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"; 
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
    messagesData: [
        {id:"1", message:"Salam Brat!"},
        {id:"2", message:"Cho tam kalaisyn?"},
        {id:"3", message:"Kettik Tauga?)"}
    ],
    dialogsData: [
        {name:"Person1", id:"1"},
        {name:"Person2", id:"2"},
        {name:"Person3", id:"3"},
        {name:"Person4", id:"4"},
        {name:"Person5", id:"5"}
    ],
    newMessageBody: ""
}

const dialogsReducer = (state = initialState, action) => 
{
    let stateCopy;
    switch(action.type)
    {
        case UPDATE_NEW_MESSAGE_BODY:
        {
            stateCopy = {...state, newMessageBody: action.body};
            return stateCopy;
        }
        case SEND_MESSAGE:
        {
            let body = state.newMessageBody;
            stateCopy = {...state, newMessageBody: "", messagesData: [...state.messagesData, {id: 6, message: body}]};
            return stateCopy;
        }
        default:
        {
            return state;
        }
    }
}

export function sendMessageCreator()
{
    return {type: SEND_MESSAGE};
}

export function updateNewMessageBodyCreator(text)
{
    return {
        type: UPDATE_NEW_MESSAGE_BODY, body: text
    }
}


export default dialogsReducer;