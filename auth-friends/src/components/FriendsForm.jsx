import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { useForm } from "../hooks/useForm";

const FriendsForm = () => {

    const [formValues, handleChange] = useForm({
        name: '',
        age: '',
        email: ''
    });
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        
        const newFriend = {
            name: formValues.name,
            age: formValues.age,
            email: formValues.email
        }

        axiosWithAuth()
        .post('/api/friends', newFriend)
        .then(res => {
            history.push('/list')
        })
        .catch(err => console.log(err))
    };

    return (
        <div className='container'>
            <h6>Add Friends</h6>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                />
                <label>Age</label>
                <input
                    type="text"
                    name="age"
                    value={formValues.age}
                    onChange={handleChange}
                />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default FriendsForm;