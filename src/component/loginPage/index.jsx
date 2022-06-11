import React, { useState } from 'react'
import './loginPage.css'

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [viewPassword, setViewPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let errorRef = error;

        if (name === 'email') {
            if (error.email === 'invalid email id') {
                validateEmail(value)
            } else {
                errorRef[name] = null;
                setError(errorRef);
            }
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
            errorRef[name] = null;
            setError(errorRef);
        }
    }

    const validateEmail = (value) => {
        let errorRef = { ...error };
        if (value === '') {
            errorRef.email = "Email can't be blank";
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            errorRef.email = null;
        } else {
            errorRef.email = 'invalid email id';
        }
        setError(errorRef)
    }

    const validatePassword = (value) => {
        let errorRef = { ...error };
        if (value === "") {
            errorRef.password = "Password can't be blank";
        } else if (value.length < 8) {
            errorRef.password = "Password should be minimum of 8 characters";
        } else if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value) == false) {
            errorRef.password = "Password should be a combination of numbers, strings and special characters"
        } else {
            errorRef.password = null;
        }
        setError(errorRef);
    }

    const handleLogin = () => {
        // login api calls
    }

    return (
        <div className="container">
            <div className="input-container">
                <div className="email-container">
                    <input
                        type="text"
                        className="email-input"
                        name='email'
                        value={email}
                        onChange={(e) => handleChange(e)}
                        placeholder="Email"
                        onBlur={(e) => validateEmail(e.target.value)}
                    />
                </div>
                {error.email && <span className="error-message">{error.email}</span>}
                <div className="password-container">
                    <div className="eye-button" onClick={() => setViewPassword(!viewPassword)}>
                        {viewPassword ?
                            <i className="fa fa-eye-slash" /> :
                            <i className="fa fa-eye" />
                        }
                    </div>
                    <input
                        type={viewPassword ? "text" : "password"}
                        className="password-input"
                        name='password'
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => validatePassword(e.target.value)}
                    />
                </div>
                {error.password && <span className="error-message">{error.password}</span>}
            </div>
            <button className="login-button" onClick={() => handleLogin()} >Login</button>
        </div>
    )
}

export default LoginPage
