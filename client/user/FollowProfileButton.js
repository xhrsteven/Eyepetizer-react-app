import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles, Button} from '@material-ui/core';
import {follow, unfollow} from './api-user.js';

class FollowProfileButton extends Component {
    followClick =()=>{
        this.props.onButtonClick(follow)
    }
    unfollowClick = ()=>{
        this.props.onButtonClick(unfollow)
    }
    render(){
        return(
            <div>
            {this.props.following ? (<Button onClick={this.unfollowClick}>unfollow</Button>)
             : (<Button onClick={this.followClick}>Follow</Button>)}
            </div>
        )
    }
}
FollowProfileButton.PropTypes = {
    following: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired
}

export default FollowProfileButton