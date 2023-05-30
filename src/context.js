import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? (contact = action.payload) : contact
        )
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, setState] = useState({
    contacts: [],
    dispatch: action => setState(state => reducer(state, action))
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        setState(prevState => ({ ...prevState, contacts: res.data }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, []);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export const Consumer = Context.Consumer;
