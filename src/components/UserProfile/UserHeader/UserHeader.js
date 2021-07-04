import React from 'react';
import './UserHeader.css';
import facebookApi from '../../../apis/facebook-api';
import Cookies from 'universal-cookie';
import FollowButton from '../FollowButton/FollowButton';

class UserHeader extends React.Component {

    state = { avatarChosen: false, avatar: "" }

    onAvatarSubmit = async (e) => {
        e.preventDefault();
        console.log("in user avatar")
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

    render() {
        return (
            <div className="header-container">
                <div className="header">
                    <h1 className="user-name">{this.props.userName}</h1>
                    <div className="user-image">
                    </div>
                    {this.props.myProfile ?
                        <form encType="multipart/form-data" method="post" onSubmit={(e) => this.onAvatarSubmit(e)}><input type="file" className="circular ui icon button transparent" onChange={(e) => this.setState({ avatar: e.target.value, avatarChosen: true })} />
                            <input type="submit" className={this.state.avatarChosen ? 'ui button submitAvatar' : 'hide'} /></form> : null}
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