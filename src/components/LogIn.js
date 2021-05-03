import React from 'react';
import logo from '../pictures/logo.svg';
import '../style/Login.css';

class Login extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="box">
                    <div>
                        <img src={logo} alt="logo" style={{ width: "300px" }}></img>
                        <h2>Connect with friends and the world around you on Facebook.</h2>
                    </div>
                </div>
                <div className="box">
                    <form className="form">
                        <input type="text" id="email" placeholder="Email or Phone Number" />
                        <input type="text" id="password" placeholder="Password" />
                        <div>
                            <input type="submit" className="logInBtn" value="Submit" />
                        </div>
                        <a href="/">Forgot Password?</a>
                        <br></br>
                        <div>
                            <input type="submit" className="newAccountBtn" value="Create New Account" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default Login;