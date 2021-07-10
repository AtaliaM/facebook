import React from 'react';
import './UserHeader.css';
import FollowButton from '../FollowButton/FollowButton';
import defaultImg from '../../../pictures/square-image.png';
import { getUserFile, postUserFile, deleteUserFile } from '../../../authPaths';

class UserHeader extends React.Component {

    state = { avatarChosen: false, avatar: "", imageSrc: defaultImg, headerChosen: false, header: "" }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.checkUserImg();
        }
    }

    checkUserImg = async () => {
        const res = await getUserFile(this.props.userId, "avatar");
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
            await postUserFile(userAvatar, "avatar");
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    onDeleteAvatar = async () => {
        try {
            await deleteUserFile("avatar");
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
                    {this.props.myProfile ?
                        <form encType="multipart/form-data" method="post" onSubmit={(e) => this.onAvatarSubmit(e)}>
                            <input id="profilePic" type="file" className="circular ui icon button transparent" onChange={(e) => this.setState({ avatar: e.target.value, avatarChosen: true })} />
                            <input type="submit" className={this.state.avatarChosen ? 'ui button submitAvatar' : 'hide'} value="Upload" />
                            {this.state.imageSrc !== defaultImg ? <button className="ui button icon" onClick={this.onDeleteAvatar}>Delete Avatar</button> : null}</form> : null}
                    {this.props.myProfile ?
                        <button className="ui button icon userHeaderBtn"><i className="fas fa-camera-retro"></i>Change header picture</button> 
                        : null
                    }
                    {this.props.myProfile ? null : <FollowButton userId={this.props.userId} userPath={this.props.userPath} />}
                </div>
            </div>
        )

    }

}

export default UserHeader;

/* <form encType="multipart/form-data" method="post" onSubmit={(e) => this.onHeaderSubmit(e)}>
    <input id="header" type="file" className="circular ui icon button transparent" onChange={(e) => this.setState({ header: e.target.value, headerChosen: true })} />
    <input type="submit" className={this.state.headerChosen ? 'ui button submitAvatar' : 'hide'} value="Upload" />
    {this.state.imageSrc !== defaultImg ? <button className="ui button icon" onClick={this.onDeleteHeader}>Delete Header</button> : null}</form> */