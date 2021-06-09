import React from 'react';
import '../style/AddUserPost.css';
import facebookApi from '../apis/facebook-api';
import Cookies from 'universal-cookie';


class AddUserPost extends React.Component {
    //user's new post//
    state = {userPostBody : "", userPostHeader: "", formOpened: false}

    openOrCloseForm = () => {
        console.log("inn")
        this.setState(prevState => ({
            formOpened: !prevState.formOpened
          }));
    }

    uploadPost = async(event) => {
        event.preventDefault();
        const post = {postBody: this.state.userPostBody, postHeader: this.state.userPostHeader};
        const cookies = new Cookies();
        const userToken = cookies.get('userToken');
        try {
            await facebookApi.post('/posts', post, {
                headers: { Authorization: "Bearer " + userToken }
            })
            this.openOrCloseForm();
            window.location.reload();
            // this.props.history.push("/myProfile");
        } catch(e) {
            console.log(e);
        }

    }

    render() {
        return (
            <div>
                <div className="buttonContainer">
                    <button className="ui button" onClick={() => this.openOrCloseForm()}>Add new post</button>
                </div>
    
                <div className={`form-popup2 ${this.state.formOpened ? "show" : "hidden"}`} id="myForm">
                    <form action="/action_page.php" className="form-container2" onSubmit={this.uploadPost}>
                        <h2 className="posth2">What's on your mind?</h2>
                        <input type="text" id="postHeader" className="postHeader" onChange={(e) => this.setState({ userPostHeader: e.target.value })} />
                        <textarea onChange={(e)=>this.setState({userPostBody:e.target.value})} required/>
                        <button type="submit" className="btn">Submit post</button>
                        <button type="button" className="btn cancel" onClick={() =>this.openOrCloseForm()}>Close</button>
                    </form>
                </div>
    
            </div>
        )
    }

}

export default AddUserPost;