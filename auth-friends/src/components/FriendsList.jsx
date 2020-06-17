import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const FriendsList = () => {

    const [formValues, setFormValues] = useState({});
    const [friends, setFriends] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editFriend, setEditFriend] = useState({});

    useEffect(() => {
        axiosWithAuth()
        .get('/api/friends/')
        .then(res => {
            setFriends(res.data, ...friends)
        })
        .catch(err => console.log(err))
    }, [refresh])

    const dl = id => {
        axiosWithAuth()
        .delete(`/api/friends/${id}`)
        .then(res => {
            setRefresh(!refresh)
        })
        .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        const edited = {
            name: formValues.name,
            age: formValues.age,
            email: formValues.email
        }

        axiosWithAuth()
        .put(`/api/friends/${editFriend.id}`, edited)
        .then(res => {
            setEditFriend({});
            setIsEditing(false);
            setRefresh(!refresh);
        })
        .catch(err => console.log(err))
        .finally(setFormValues({
            name: '',
            email: '',
            age: ''
        }))
    };

    const handleChange = e => {
        const name  = e.target.name;
        const value  = e.target.value;

        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const edit = fr => {
        setIsEditing(true);
        setEditFriend(fr);
    }


    return (
        <div>
            <div className='wrapper'>
            {
                isEditing 
                    ? <h6>Edit {editFriend.name}</h6>
                    : <h6>Friends</h6>
            }
            </div>
            <div className='friend-container'>
                {isEditing ? (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                                placeholder={editFriend.name}
                            />
                            <label>Age</label>
                            <input
                                type="text"
                                name="age"
                                value={formValues.age}
                                onChange={handleChange}
                                placeholder={editFriend.age}
                            />
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                placeholder={editFriend.email}
                            />
                            <button>Submit</button>
                        </form>
                    </div> 
                ) : (
                   friends.map(friend => (
                        <div className='friend'>
                            <div><p>Name: {friend.name}</p>
                            <p>Email: {friend.email}</p>
                            <p>Age: {friend.age}</p>
                            <button onClick={() => {dl(friend.id)}}>Delete</button>
                            <button onClick={() => {edit(friend)}}>Edit</button></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FriendsList;