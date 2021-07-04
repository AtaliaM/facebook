import React from 'react';
import './UserHeader.css';
import facebookApi from '../../../apis/facebook-api';
import Cookies from 'universal-cookie';
import FollowButton from '../FollowButton/FollowButton';
import defaultImg from '../../../pictures/square-image.png'

class UserHeader extends React.Component {

    state = { avatarChosen: false, avatar: "", imageSrc : defaultImg }

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevProps)
        // console.log(this.props)
        if(prevProps !== this.props) {
            this.checkUserImg();
        }
      }

    checkUserImg = async () => {
        const res = await facebookApi.get(`/users/${this.props.userId}/avatar`);
        console.log(`${res.config.baseURL}${res.config.url}`);
        if(res.data) {
            this.setState({imageSrc:`${res.config.baseURL}${res.config.url}`});
        }
    }

    onAvatarSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target[0].files[0])
        const uploadedFile = e.target[0].files[0];
        try {
            const cookies = new Cookies();
            const userToken = cookies.get('userToken');
            const userAvatar = new FormData();
            userAvatar.append("avatar",uploadedFile)
            await facebookApi.post('/users/me/avatar', userAvatar, {
                headers: { Authorization: "Bearer " + userToken }
            });
            window.location.reload();

        } catch (e) {
            console.log(e);
        }
    }

    onDeleteAvatar = async()=> {
        try {
            const cookies = new Cookies();
            const userToken = cookies.get('userToken');
            await facebookApi.delete('/users/me/avatar', {
                headers: { Authorization: "Bearer " + userToken }
            })
            window.location.reload();
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="header-container">
                <div className="header">
                    <h1 className="user-name">{this.props.userName}</h1>
                    {/* <div className="user-image">
                    </div> */}
                    <img className="user-image" src={this.state.imageSrc} alt="userImg"/>
                    {this.props.myProfile ?
                        <form encType="multipart/form-data" method="post" onSubmit={(e) => this.onAvatarSubmit(e)}><input type="file" className="circular ui icon button transparent" onChange={(e) => this.setState({ avatar: e.target.value, avatarChosen: true })} />
                            <input type="submit" className={this.state.avatarChosen ? 'ui button submitAvatar' : 'hide'} />
                            {this.state.imageSrc !== defaultImg ? <button className="ui button icon" onClick={this.onDeleteAvatar}>Delete Avatar</button> : null}</form> : null}
                    {this.props.myProfile ? <button className="ui button icon userHeaderBtn"><i className="fas fa-camera-retro"></i>Change header picture</button> :
                        null
                    }
                    {this.props.myProfile ? null : <FollowButton userId={this.props.userId} userPath={this.props.userPath} />}
                </div>
            </div>
        )

    }

}

export default UserHeader;