import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import {Delete} from '@material-ui/icons/Delete'
import {remove} from './api-user'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'

class DeleteUser extends Component {
    state={
        redirect: false,
        open: false
    }
    clickButton = () =>{
        this.setState({open: true})
    }
    deleteAccount =()=>{
        const jwt = auth.isAuthenticated()
        remove({
            userId: this.props.userId
        }, {t: jwt.token}).then((data) =>{
            if(data.error){
                console.log(data.error);
            }else{
                auth.signOut(() => console.log('deleted'))
                this.setState({redirect: true})
            }
        })
    }
    handleRequestClose =() =>{
        this.setState({open:false})
    }

    render(){
        const redirect = this.state.redirect
        if(redirect){
            return <Redirect to='/'/>
        }
        return (
            <span>
                <IconButton aria-label='Delete' onClick={this.clickButton} color="secondary">
                    <Delete />
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleRequestClose}>
                    <DialogTitle>
                        {'DeleteAccount'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Confirm to delete your account.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteAccount} color="secondary" autoFocus='autoFocus'>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </span>
        )
    }
}

DeleteUser.PropTypes = {
    userId: PropTypes.string.isRequired
}

export default DeleteUser;