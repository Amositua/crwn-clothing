import { createContext, useEffect, useState, useReducer } from "react";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Action Types
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// Initial State
const INITIAL_STATE = {
  currentUser: null,
};

// Reducer Function
const userReducer = (state = INITIAL_STATE, action) => {
  // console.log("dispatched");
  // console.log(action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

// Action Creator
const setCurrentUserAction = (usersi) => ({
  type: USER_ACTION_TYPES.SET_CURRENT_USER,
  payload: usersi,
});

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
// console.log(currentUser)

const setCurrentUser = (users) => dispatch(setCurrentUserAction(users));

const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    // console.log(unsubscribe);
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
