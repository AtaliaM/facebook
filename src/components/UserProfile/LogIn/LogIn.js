import React from 'react';
import logo from '../../../pictures/logo2.png';
import './Login.css';
import Cookies from 'universal-cookie';
import {registerOrLoginUser} from '../../../authPaths';

class Login extends React.Component {

    state = { fname: "", lname: "", email: "", password: "", birthday: "", formOpened: false, submitBtnPushed: false };

    openOrCloseForm = () => {
        this.setState(prevState => ({
            formOpened: !prevState.formOpened
          }));
    }

    onSubmitBtnPushed = () => {
        this.setState(prevState => ({
            submitBtnPushed: !prevState.submitBtnPushed
          }));
    }

    logInUser = async (event) => {
        event.preventDefault();
        this.onSubmitBtnPushed();
        const reqBody = { email: this.state.email, password: this.state.password };

        try {
            // const response = await facebookApi.post("/users/login", reqBody);
            const response = await registerOrLoginUser("login", reqBody);
            const cookies = new Cookies();
            cookies.set('userToken', response.data.token, {sameSite: "strict"});
            this.props.history.push('/myProfile');
        } catch (e) {
            console.log(e);
            this.onSubmitBtnPushed();
            alert("E-mail or password are invalid");
        }
    }

    registerUser = async (event) => {
        event.preventDefault();
        this.onSubmitBtnPushed();

        const reqBody = {firstName:this.state.fname, lastName:this.state.lname, 
            email: this.state.email, password: this.state.password };

            try {
                // const response = await facebookApi.post("/users", reqBody);
                const response = await registerOrLoginUser("register", reqBody);
                const cookies = new Cookies();
                cookies.set('userToken', response.data.token, {sameSite: "strict"});
                this.props.history.push('/myProfile');
            } catch (e) {
                console.log(e);
                this.onSubmitBtnPushed();
                alert("Inputs are invalid");
            }
    }

    jokePopup = () => {
        alert("One day you'll be able to get a 'reset password' email when you click this! What a time to be alive!");
    }

    render() {
        return (
            <div className="container">
                <div className="box">
                    <div>
                        <img src={logo} className="logo-picture" alt="logo"></img>
                        <h2>Connect with friends and the world around you on Facebook.</h2>
                        <div className={`${this.state.submitBtnPushed ? "ui active centered inline loader" : ""}`}></div>
                    </div>
                </div>

                <div className="box">
                    <form className="loginForm" onSubmit={this.logInUser} >
                        <input className="logIn" type="text" id="email" placeholder="Email" required onChange={(e) => this.setState({ email: e.target.value })} />
                        <input className="logIn" type="password" id="password" placeholder="Password" required onChange={(e) => this.setState({ password: e.target.value })} />
                        <div>
                            <button type="submit" className="btn logInBtn" >Submit</button>
                        </div>
                        <a href="/" onClick={this.jokePopup}>Forgot Password?</a>
                        <br></br>
                        <div>
                            <input className="btn newAccountBtn" defaultValue="Create New Account" onClick={() => this.openOrCloseForm()} />
                        </div>
                    </form>
                </div>

                <div className={`form-popup ${this.state.formOpened ? "show" : "hidden"}`} id="myForm">
                    <form action="/action_page.php" className="form-container" onSubmit={this.registerUser}>
                        <h1>Sign Up</h1>

                        <input type="text" placeholder="first name" name="fname" required onChange={(e) => this.setState({ fname: e.target.value })} />
                        <input type="text" placeholder="last name" name="lname" required onChange={(e) => this.setState({ lname: e.target.value })} />

                        <input type="email" placeholder="email" name="email" required onChange={(e) => this.setState({ email: e.target.value })} />
                        <input type="password" placeholder="new password" name="psw" minLength="7" required onChange={(e) => this.setState({ password: e.target.value })} />

                        <button type="submit" className="btn">Sign Up</button>
                        <button type="button" className="btn cancel" onClick={() => this.openOrCloseForm()}>Close</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;