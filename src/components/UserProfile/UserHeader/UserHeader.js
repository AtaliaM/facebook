import React from 'react';
import './UserHeader.css';
import facebookApi from '../../../apis/facebook-api';
import Cookies from 'universal-cookie';
import FollowButton from '../FollowButton/FollowButton';
import defaultImg from '../../../pictures/square-image.png';
import {getUserAvatar, postUserAvatar} from '../../../authPaths';

class UserHeader extends React.Component {

    state = { avatarChosen: false, avatar: "", imageSrc: defaultImg }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.checkUserImg();
        }
    }

    checkUserImg = async () => {
        const res = await getUserAvatar(this.props.userId);
        if (res.data) {
            this.setState({ imageSrc: `${res.config.baseURL}${res.config.url}` });
        }
    }

    onAvatarSubmit = async (e) => {
        e.preventDefault();
        const uploadedFile = e.target[0].files[0];
        try {
            const userAvatar = new FormData();
            userAvatar.append("avatar", uploadedFile)
            await postUserAvatar(userAvatar);
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    onDeleteAvatar = async () => {
        try {
            const cookies = new Cookies();
            const userToken = cookies.get('userToken');
            await facebookApi.delete('/users/me/avatar', {
                headers: { Authorization: "Bearer " + userToken }
            })
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="header-container">
                <div className="header">
                    <h1 className="user-name">{this.props.userName}</h1>
                    <img className="user-image" src={this.state.imageSrc} alt="userImg" />
                            {/* <label htmlFor="profilePic" className="ui button icon edit-pic">
                                    <i className="camera icon"></i>
                            </label> */}
                    {this.props.myProfile ?
                        <form encType="multipart/form-data" method="post" onSubmit={(e) => this.onAvatarSubmit(e)}>
                            <input id="profilePic" type="file" className="circular ui icon button transparent" onChange={(e) => this.setState({ avatar: e.target.value, avatarChosen: true })}/>
                            <input type="submit" className={this.state.avatarChosen ? 'ui button submitAvatar' : 'hide'} value="Upload"/>
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