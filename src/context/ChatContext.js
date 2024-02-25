import {
    createContext,
    useContext,
    useReducer,
  } from "react";
  import { useAuth } from "./AuthContext";
  
  
  
  export const ChatContext = createContext();
  
  export function useChat() {
    return useContext(ChatContext)
  }
  export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useAuth();

    const INITIAL_STATE = {
      chatId: null,
      user: null,
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            user: action.payload,
            chatId:
              currentUser.uid > action.payload
                ? currentUser.uid + action.payload
                : action.payload + currentUser.uid,
          };
        case "CLOSE_USER":
          return INITIAL_STATE; 
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };