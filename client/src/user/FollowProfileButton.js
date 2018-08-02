import React, { Component } from "react";
import PropTypes from 'prop-types';
// import {withStyles} from '@material-ui/core/styles';
import {follow, unFollow} from './api-user.js';
import {Button} from '@material-ui/core/Button';

class FollowProfileButton extends Component {
    followClick =()=>{
        this.props.onButtonClick(follow)
    }
    unFollowClick = ()=>{
        this.props.onButtonClick(unFollow)
    }
    render(){
        return(
            <div>
            {this.props.following ? (<Button onClick={this.unFollowClick}>unFollow</Button>)
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