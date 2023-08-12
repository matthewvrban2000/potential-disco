import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";

function Register(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    async function createUser() {
        const formData = {
            username: username,
            password_hash: password,
        }

        const response = await fetch('http://localhost:8000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();

        return data;
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        createUser().then(data => {
            props.setToken(data.access_token);
            localStorage.setItem('token', JSON.stringify(data.access_token));
            history.push("/");
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
               <p> Username <input type="text" onChange={e => setUsername(e.target.value)} /></p>
               <p> Password <input type="password" onChange={e => setPassword(e.target.value)} /> </p>
                <p><button>Register</button></p>
               <p> <Link to="/register">Login</Link></p>
            </form>
        </div>
    )
}

export default Register;