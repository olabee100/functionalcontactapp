import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Consumer } from '../../context';
import axios from 'axios';
import TextInputGroup from '../Layout/TextInputGroup';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
    errors: {}
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const contact = res.data;
        setState({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          errors: {}
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchContact();
  }, [id]);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = state;

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

    const updContact = {
      name,
      email,
      phone
    };

    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updContact
      );

      dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

      setState({
        name: '',
        email: '',
        phone: '',
        errors: {}
      });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Consumer>
      {value => {
        const { dispatch } = value;

        return (
          <div className="card mb-3">
            <div className="card-header">Edit Contact</div>
            <div className="card-body">
              <form onSubmit={onSubmit.bind(this, dispatch)}>
                <TextInputGroup
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={state.name}
                  onChange={onChange}
                  error={state.errors.name}
                />

                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={state.email}
                  onChange={onChange}
                  error={state.errors.email}
                />

                <TextInputGroup
                  label="Phone"
                  name="phone"
                  placeholder="Enter Phone"
                  value={state.phone}
                  onChange={onChange}
                  error={state.errors.phone}
                />

                <input
                  type="submit"
                  value="Update Contact"
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

export default EditContact;
