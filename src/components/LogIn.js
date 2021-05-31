import React from 'react';
import logo from '../pictures/logo.svg';
import '../style/Login.css';
import facebookApi from '../apis/facebook-api';
import Cookies from 'universal-cookie';

class Login extends React.Component {

    state = { fname: "", lname: "", email: "", password: "", birthday: "" };

    openForm = () => {
        document.getElementById("myForm").style.display = "block";
    }

    closeForm = () => {
        document.getElementById("myForm").style.display = "none";
    }

    logInUser = async (event) => {
        event.preventDefault();
        console.log("login")
        const reqBody = { email: this.state.email, password: this.state.password };

        try {
            const response = await facebookApi.post("/users/login", reqBody);
            // this.setState({user:response.data.user});
            //setting new token cookie for the user who just logged in//
            const cookies = new Cookies();
            cookies.set('userToken', response.data.token);
            this.props.history.push('/myProfile');
        } catch (e) {
            console.log(e);
        }
    }

    registerUser = async (event) => {
        event.preventDefault();
        console.log("register");

        const reqBody = {firstName:this.state.fname, lastName:this.state.lname, 
            email: this.state.email, password: this.state.password };

            try {
                const response = await facebookApi.post("/users", reqBody);
                //setting new token cookie for the user who just registered//
                const cookies = new Cookies();
                cookies.set('userToken', response.data.token);
                this.props.history.push('/myProfile');
            } catch (e) {
                console.log(e);
            }
    }

    render() {
        return (
            <div className="container">
                <div className="box">
                    <div>
                        <img src={logo} className="logo-picture" alt="logo"></img>
                        <h2>Connect with friends and the world around you on Facebook.</h2>
                    </div>
                </div>

                <div className="box">
                    <form className="form" onSubmit={this.logInUser} >
                        <input type="text" id="email" placeholder="Email" required onChange={(e) => this.setState({ email: e.target.value })} />
                        <input type="password" id="password" placeholder="Password" required onChange={(e) => this.setState({ password: e.target.value })} />
                        <div>
                            {/* <input className="btn logInBtn" defaultValue="Submit"/> */}
                            <button type="submit" className="btn logInBtn">Submit</button>
                        </div>
                        <a href="/">Forgot Password?</a>
                        <br></br>
                        <div>
                            <input className="btn newAccountBtn" defaultValue="Create New Account" onClick={() => this.openForm()} />
                        </div>
                    </form>
                </div>

                <div className="form-popup" id="myForm">
                    <form action="/action_page.php" className="form-container" onSubmit={this.registerUser}>
                        <h1>Sign Up</h1>

                        <input type="text" placeholder="first name" name="fname" required onChange={(e) => this.setState({ fname: e.target.value })} />
                        <input type="text" placeholder="last name" name="lname" required onChange={(e) => this.setState({ lname: e.target.value })} />

                        <input type="email" placeholder="email" name="email" required onChange={(e) => this.setState({ email: e.target.value })} />
                        <input type="password" placeholder="New Password" name="psw" minLength="7" required onChange={(e) => this.setState({ password: e.target.value })} />

                        {/* <label>Birthday</label>
                        <input type="date" id="birthday" name="birthday"/> */}

                        <button type="submit" className="btn">Sign Up</button>
                        <button type="button" className="btn cancel" onClick={() => this.closeForm()}>Close</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default Login;