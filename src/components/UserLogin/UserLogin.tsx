import { useState } from 'react';
import './UserLogin.css';
import { ILoginData } from './UserLoginTypes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {

    const [loginData, setLoginData] = useState<ILoginData>({ username: "", password: "" });
    const navigate = useNavigate();

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData: ILoginData = {
            username: loginData.username,
            password: loginData.password,
        };

        axios.post('http://localhost:8000/api/auth/token', userData).then((response) => {

            localStorage.setItem('accessToken', response.data.access_token);

            if (response.data.is_admin) {
                navigate('/user-creation');
            } else {
                navigate('/user-details');
            }
        });
    }

    return (
        <div className="user-login-container">
            <form className="user-login-form" onSubmit={handleFormSubmit}>
                <h2 className="login-title">Login</h2>
                <div className="username-wrapper">
                    <label htmlFor="" className="username-label">Username</label>
                    <input type="text" onChange={(event) =>
                        setLoginData({ ...loginData, username: event.target.value })
                    } />
                </div>
                <div className="password-wrapper">
                    <label htmlFor="" className="password-label">Password</label>
                    <input type="password" onChange={(event) =>
                        setLoginData({ ...loginData, password: event.target.value })
                    } />
                </div>
                <button className="login-btn">Login</button>
            </form>
        </div>
    )
}