import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
    _state: {
        profilePage:{
            postsData: [
                {id:1, message:"Hi, how are you?", likesCount:12},
                {id:2, message:"It's my first post", likesCount:21},
            ],
            newPostText: "it-kamasutra.com"
        },
        dialogsPage: {
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
    },
    _callSubscriber()
    {
        console.log('Change in state');
    },

    getState()
    {
        return this._state;
    },
    subscribe(observer)
    {
        this._callSubscriber = observer;    
    },
    
    addPost()
    {
        let obj = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.postsData.push(obj);
        this._callSubscriber(this._state);
        this._state.profilePage.newPostText = "";
    },
    updateNewPostText(updatedText)
    {
        this._state.profilePage.newPostText = updatedText;
        this._callSubscriber(this._state);
    },
    dispatch(action)
    {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);
    }
}


export default store;
window.store = store;