import { createSlice } from "@reduxjs/toolkit"

const inboxSlice = createSlice({
    name: 'inbox',
    initialState: {id:null, name:'', userId: null, userName:'', profilepic:null, clientPic: null, userFullName:null, conversation :{}, messageId: null, seen:false,
    userEmail: null, isDarkMode: false

    },
    reducers:{
        setId:(state, action) =>{
            state.id = action.payload;
        },
        setName:(state, action)=>{
            state.name = action.payload
        },
        setUserId:(state, action)=>{
            state.userId = action.payload
        },
        setUserName:(state, action)=>{
            state.userName = action.payload
        },
        setUserEmail:(state, action)=>{
            state.userEmail = action.payload
        },
        setProfile:(state, action)=>{
            state.profilepic = action.payload
        },
        setClientPic:(state, action)=>{
            state.clientPic = action.payload
        },
        setuserFullName:(state, action)=>{
            state.userFullName = action.payload
        },
        setConversation:(state, action)=>{
            state.conversation = action.payload
        },
        setMessageId:(state, action)=>{
            state.messageId = action.payload
        },
        setSeen:(state, action)=>{
            state.seen = action.payload
        },
        setIsDarkMode:(state, action)=>{
            state.isDarkMode = action.payload
        },
        
        
        
    }
})

export const {setId, setName, setUserId, setUserName, setProfile, setClientPic, setuserFullName, setConversation, setMessageId, setSeen, setUserEmail, setIsDarkMode} = inboxSlice.actions
export default inboxSlice.reducer