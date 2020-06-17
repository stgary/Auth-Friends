import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const initialFormValues = {
    name: '',
    age: '',
    email: ''
}

const FriendsForm = () => {

    const [formValues, setFormValues] = useState(initialFormValues);
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
        .finally(setFormValues(initialFormValues))
    };

    const handleChange = e => {
        const name  = e.target.name;
        const value  = e.target.value;

        setFormValues({
            ...formValues,
            [name]: value
        });
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