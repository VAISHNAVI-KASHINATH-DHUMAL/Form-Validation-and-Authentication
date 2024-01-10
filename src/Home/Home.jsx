import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [myData, setMyData] = useState([]);
    const [isError, setIsError] = useState("");
    const navigate = useNavigate();

    /* useEffect(() => {
         axios
             .get("https://jsonplaceholder.typicode.com/posts")
             .then((res) =>
                 setMyData(res.data))
             .catch((error) => 
                 setIsError(error.message)
             );
     }, []); */

    //using Async Await
    const getMyPostData = async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setMyData(res.data);
        } catch (error) {
            setIsError(error.message);
        }
    };

    useEffect(() => {
        getMyPostData();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    }

    return (
        <>
            <h1>API Calling using Axios</h1>
            <button onClick={handleLogout}>Logout</button>
            {isError !== "" && <h2>{isError}</h2>}
            {myData.map((post) => {
                const { id, title, body } = post;
                return (
                    <div className='card' key={id}>
                        <h2>{title}</h2>
                        <p>{body}</p>
                    </div>
                );
            })}
        </>
    )
}

export default Home
