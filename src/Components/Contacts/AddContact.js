import React, { useState } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';
import TextInputGroup from '../Layout/TextInputGroup';

const AddContact = ({ history }) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
    errors: {}
  });

  const { name, email, phone, errors } = state;

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (dispatch, e) => {
    e.preventDefault();

    if (name === '') {
      setState({ ...state, errors: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      setState({ ...state, errors: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      setState({ ...state, errors: { phone: 'Phone is required' } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );
    dispatch({ type: 'ADD_CONTACT', payload: res.data });

    setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    history.push('/');
  };

  return (
    <Consumer>
      {value => {
        const { dispatch } = value;
        return (
          <div className="card mb-3">
            <div className="card-header">Add Contact</div>
            <div className="card-body">
              <form onSubmit={onSubmit.bind(this, dispatch)}>
                <TextInputGroup
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={onChange}
                  error={errors.name}
                />

                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={onChange}
                  error={errors.email}
                />

                <TextInputGroup
                  label="Phone"
                  name="phone"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={onChange}
                  error={errors.phone}
                />

                <input
                  type="submit"
                  value="Add Contact"
                  className="btn btn-block btn-light"
                />
              </form>
            </div>
          </div>
        );
      }}
    </Consumer>
  );
};

export default AddContact;
