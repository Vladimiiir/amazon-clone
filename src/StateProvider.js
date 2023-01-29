import React, { createContext, useContext, useReducer } from "react";

// Prepares the dataLayer
export const StateContext = createContext();

// Wraps our app and provides the dataLayer to all components
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// initialState: what does the dataLayer look like at the begining
// reducer: how we manipulate the dL / dispatch this action into the dL / always listening and waiting to do a dispatch

// Pull info from the dataLayer
export const useStateValue = () => useContext(StateContext);
