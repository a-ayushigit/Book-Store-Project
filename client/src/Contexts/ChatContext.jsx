import React , { createContext , useReducer , useContext} from 'react';

const chatContext = createContext({});

const actionTypes = {
SET_SELECTED_CONVERSATION : 'SET_SELECTED_CONVERSATION',
SET_MESSAGES : 'SET_MESSAGES'

}

const chatReducer = (state , action) => {
    switch(action.type){
        case actionTypes.SET_SELECTED_CONVERSATION :
            return { selectedConversation : action.payload};
        case actionTypes.SET_MESSAGES :
            return {...state , messages : action.payload};
        default :
            return state;
    }
}

export const ChatProvider = ({ children }) => {
    const [state , dispatch] = useReducer(chatReducer , { selectedConversation : null , messages : [] });


const setSelectedConversation = (selectedConversation) => {
    dispatch ({ type : actionTypes.SET_SELECTED_CONVERSATION , payload : selectedConversation })
}

const setMessages = (messages) => {
    dispatch ({ type : actionTypes.SET_MESSAGES , payload : messages })
}

return (
    <chatContext.Provider value={{
        selectedConversation : state.selectedConversation ,
        messages : state.messages ,
        setSelectedConversation ,
        setMessages
    }}>
        {children}
    </chatContext.Provider>
)
};
export const useChatContext = () => {
    const context = useContext(chatContext);
  if(!context){
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}
