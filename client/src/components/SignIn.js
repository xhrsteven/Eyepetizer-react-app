//Sign In /Register page view
import React, {Component} from 'react'
import {AppBar, Tab, Tabs, TextField, Button,Typography, Dialog, DialogContent,DialogTitle,DialogActions, DialogContentText, Icon} from '@material-ui/core'
import {Redirect, Link} from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { signIn } from './../auth/api-auth'
import auth from './../auth/auth-helper'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import './SignIn.css'
import Menu from './Menu'
import { create } from 'domain';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    margin: "auto",
    height: 500
  },
  Tab: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: "middle"
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10,
    width: 300,
    margin: "auto"
  },
  submit: {
    width: 300,
    margin: "auto",
    marginTop: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10,
  }
});

class SignIn extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false,
        value: 0,
        open: false
    }

    clickSubmit = () => {
        const user = {
            email: this.state.email || undefined,
            password: this.state.password || undefined
        }

        signIn(user).then((data) => {
            if (data.error) {
                this.setState({ error: data.error })
            } else {
                auth.authenticate(data, () => {
                    this.setState({ redirectToReferrer: true })
                })
            }
        })
    }
    clickRegister = () =>{
        const user ={
            username: this.state.username || undefined,
            email: this.state.email || undefined,
            password: this.state.password || undefined
        }
        create(user).then((data) =>{
            if(data.error){
                this.setState({error: data.error})
            }else{
                this.setState({error: '', open: true})
            }
        })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleTabChange = (event, value) =>{
        this.setState({value})
    }

    handleChangeIndex = index => {
        this.setState({value: index })
    }

    render() {
        const { classes, theme } = this.props
        const { from } = this.props.location.state || {
            from: {
                pathname: '/'
            }
        }
        const { redirectToReferrer } = this.state
        if (redirectToReferrer) {
            return (<Redirect to={from} />)
        }

        return (
           <div className={classes.root}>
             <Menu />
                <AppBar position="static" color="default">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                    // className ={classes.Tab}
                >
                    <Tab label="Login" />
                    <Tab label="Register" />

                </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                <TabContainer dir={theme.direction}>
                    <TextField 
                    id="email"
                    type="email"
                    label="Email"
                    className={classes.textField}
                    margin="normal"
                    /><br />
                    <TextField
                    id="password"
                    type="password"
                    label="Password"
                    className={classes.textField}
                    margin="normal"
                    /><br />
                    {this.state.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {this.state.error}</Typography>) }
                    <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Login</Button>
                </TabContainer>
                
                <TabContainer dir={theme.direction}>
                        <TextField
                            id="username"
                            value={this.state.username}
                            type="username"
                            label="Username"
                            margin="normal"
                            onChange={this.handleChange('username')}
                            className={classes.textField}
                        />
                        <br />
                        <TextField
                            id="email"
                            value={this.state.email}
                            type="email"
                            label="Email"
                            onChange={this.handleChange('email')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            id="password"
                            value={this.state.password}
                            type="password"
                            label="Password"
                            onChange={this.handleChange('password')}
                            margin="normal"
                            className={classes.textField}
                        />
                        <br />
                        {this.state.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {this.state.error}</Typography>) }
                        <Button color="primary" variant="raised" className={classes.submit} onClick={this.clickRegister}>
                            Register
                        </Button>
                        <Dialog open={this.state.open} disableBackdropClick={true}>
                            <DialogTitle>New Account</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    New account successfully created!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Link to={from}>
                                    <Button color='primary' autoFocus='autoFocus' variant='raised'>LOGIN</Button>
                                </Link>
                            </DialogActions>
                        </Dialog>
                </TabContainer>

                </SwipeableViews>
            </div>
        )
    }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(SignIn)