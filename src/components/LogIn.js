import React from 'react';
import logo from '../pictures/logo.svg';
import '../style/Login.css';

class Login extends React.Component {

    openForm = () => {

        document.getElementById("myForm").style.display = "block";
    }

    closeForm = () => {
        document.getElementById("myForm").style.display = "none";
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
                            <input className="btn newAccountBtn" value="Create New Account" onClick={() => this.openForm()} />
                        </div>
                    </form>
                </div>
                <div className="form-popup" id="myForm">
                    <form action="/action_page.php" className="form-container">
                        <h1>Sign Up</h1>

                        <input type="text" placeholder="first name" name="fname" required />
                        <input type="text" placeholder="last name" name="lname" required />

                        <input type="email" placeholder="Mobile number or email" name="psw" required />
                        <input type="password" placeholder="New Password" name="psw" required />

                        <label>Birthday</label>
                        <input type="date" id="birthday" name="birthday"/>

                        <button type="submit" class="btn">Sign Up</button>
                        <button type="button" class="btn cancel" onClick={()=>this.closeForm()}>Close</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default Login;