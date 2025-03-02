import React, { useState, useEffect } from 'react';
import Dashboard from "./Dashboard";
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../service';
import { title } from 'process';

function Demoapi() {
    const [posts, setPosts] = useState([{
        id : "",
        title: "",
        body: ""
    }
        
    ]); 
    const [getpost, getPostdata] = useState();

    useEffect(() => {
        

        
    }, []);

    return (
        <>
            <Dashboard />
            <div>
                <h2>Posts</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Demoapi;
