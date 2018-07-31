import React, {Component} from 'react'
import {Card, CardActions, CardContent, Button, TextField, Typography, Avatar,Icon} from '@material-ui/core'
import FileUpload from '@material-ui/icons'
import {withStyles} from '@material-ui/core/styles'
import {read, update} from './api-user'
import {Redirect} from 'react-router-dom'
import auth from './../auth/auth-helper'
import PropTypes from 'prop-types'

const styles = theme =>({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit *2    
    },
    title: {
        margin: theme.spacing.unit * 2
    },
    error: {
        verticalAlign:'middle'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing.unit*2
    }
})

class EditProfile extends Component {
    constructor({match}) {
        super()
        this.state = {
            name: '',
            about: '',
            photo: '',
            email: '',
            password: '',
            redirectToProfile: false,
            error: ''
        }
        this.match = match
    }

    componentDidMount = () =>{
        this.userDate = new FormData()
        const jwt = auth.isAuthenticated()
        read({
            user
        })
    }
}