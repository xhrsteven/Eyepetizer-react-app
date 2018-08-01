import React, {Component} from 'react'
import {Card, CardActions, CardContent, Button, TextField, Typography, Avatar,Icon} from '@material-ui/core'
import UploadPreview from 'material-ui-upload/UploadPreview'
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
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto'
    },
    filename: {
        marginLeft: '10px'
    }
})

class EditProfile extends Component {
    constructor({match}) {
        super()
        this.state = {
            name: '',
            about: '',
            photo: {},
            email: '',
            password: '',
            redirectToProfile: false,
            error: ''
        }
        this.match = match
    }

    componentDidMount = () =>{
        this.userData = new FormData()
        const jwt = auth.isAuthenticated()
        read({
            userId: this.match.params.userId
        }, {t: jwt.token}).then((data) =>{
            if(data.error){
                this.setState({error: data.error})
            }else{
                this.setState({id: data._id,
                     name:data.name,
                    about: data.about,
                    email: data.email})
            }
        })
    }
    clickSubmit = ()=>{
        const jwt = auth.isAuthenticated()
        const user ={
            name: this.state.name || undefined,
            email: this.state.email || undefined,
            password: this.state.password || undefined,
            about: this.state.about || undefined
        }
        update({
            userId: this.match.params.userId
        }, {t: jwt.token}, this.userData).then((data) =>{
            if(data.error){
                this.setState({error: data.error})
            }else{
                this.setState({'redirectToProfile': true})
            }
        })
    }
    handleChange = name => event =>{
        const value = name === 'photo'
            ? event.target.file[0]
            : event.target.value
        this.userData.set(name, value)
        this.setState({[name]: value})
    }
    render(){
        const {classes} = this.props
        const photoUrl = this.state.id  
            ? `/api/users/photo/$(this.state.id)?${new Date().getTime()}`
            : `/api/users/defaultphoto`
        if(this.state.redirectToProfile){
            return (<Redirect to={'/user/'+this.state.id} />)
        }
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type='headline' component='h2' className={classes.title}>
                        Edit Profile
                    </Typography>
                    <Avatar src={photoUrl} className ={classes.bigAvatar} />
                    <input accept ='image/*' onChange={this.handleChange('photo')} type='file' id='icon-button-file'/>
                    <label htmlFor='icon-button-file'>
                        <Button variant='raised' component='span' color='secondary'>
                            Upload
                            <UploadPreview 
                                title='picture'
                                label='Add'
                                initialItems={this.state.photo}
                                onChange={this.onChange('picture')}
                            />

                        </Button>
                    </label><span className={classes.filename}>{this.state.photo ? this.state.photo.name:''}</span><br />
                    <TextField 
                        id='multiline-flexible'
                        label='About'
                        multiline rows='2'
                        value={this.state.about}
                        onChange={this.handleChange('about')}
                        className={classes.textField}
                        margin='normal'
                    /><br />
                    <TextField id='email' type='email' label='Email' value = {this.state.email} className={classes.textField} onChange={this.handleChange('email')} margin='normal'/><br />
                    <TextField id='password' type='password' label='Password' value={this.state.password} className={classes.textField} onChange ={this.handleChange('password')} margin='normal' /><br />
                    {
                        this.state.error && (
                            <Typography component='p' color='error'>
                                <Icon color='error' className={classes.error}>error</Icon>
                                {this.state.error}
                            </Typography>
                        )
                    }

                </CardContent>
            <CardActions>
                <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
            </CardActions>
            </Card>
        )

    }
}
EditProfile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)