import { createContext, useReducer } from "react";
import Reducer from "./Reducers";
import { useEffect } from "react";
import React from 'react';


const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  // myID: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

   useEffect(()=>{
      localStorage.setItem("user",JSON.stringify(state.user))
        // const  myID = state.user.id 
      // console.log(myID,"asad=======")
   },[state.user])

   
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        myID: state.user && state.user.id ,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
