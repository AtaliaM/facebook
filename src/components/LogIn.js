import React from 'react';
import logo from '../pictures/logo.svg';
import '../style/Login.css';

class Login extends React.Component {

    openForm = () => {

        document.getElementById("myForm").style.display = "block";
    }

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
                            <input className="btn logInBtn" value="Submit" />
                        </div>
                        <a href="/">Forgot Password?</a>
                        <br></br>
                        <div>
                            <input className="btn newAccountBtn" value="Create New Account" onClick={()=>this.openForm()} />
                        </div>
                    </form>
                </div>
                <div class="form-popup" id="myForm">
                    <form action="/action_page.php" class="form-container">
                        <h1>Login</h1>

                        <label for="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" required />

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required />

                        <button type="submit" class="btn">Login</button>
                        <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default Login;