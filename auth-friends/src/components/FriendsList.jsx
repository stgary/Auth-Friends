import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const FriendsList = () => {
    
    const  [friends, setFriends] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get('/api/friends')
        .then(res => {
            console.log(res.data)
            setFriends(res.data, ...friends)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            {friends.map(friend => (
            <div>
                <p>Name: {friend.name}</p>
                <p>Email: {friend.email}</p>
                <p>Age: {friend.age}</p>
            </div>
            ))}
        </div>
    );
};

export default FriendsList;