//Sign In /Register page view
import React, {Component} from 'react'
import {AppBar, Tab, Tabs, TextField, Button,Typography, colors} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { signIn } from './../auth/api-auth'
import auth from './../auth/auth-helper'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import './SignIn.css'
import Menu from './Menu'

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
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false,
        value: 0
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
                    <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Login</Button>
                </TabContainer>
                <TabContainer dir={theme.direction}>
                        <TextField
                            id="username"
                            type="username"
                            label="Username"
                            margin="normal"
                            className={classes.textField}
                        />
                        <br />
                        <TextField
                            id="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            id="password"
                            type="password"
                            label="Password"
                            margin="normal"
                            className={classes.textField}
                        />
                        <br />

                        <Button color="primary" variant="raised" className={classes.submit}>
                            Register
                        </Button>
                </TabContainer>

                </SwipeableViews>
            </div>
            // <Card className={classes.card}>
            //     <CardContent>
            //         <Typography type="headline" component="h2" className={classes.title}>
            //             Sign In
            //         </Typography>
            //         <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal" /><br />
            //         <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal" />
            //         <br /> {
            //             this.state.error && (<Typography component="p" color="error">
            //                 <Icon color="error" className={classes.error}>error</Icon>
            //                 {this.state.error}
            //             </Typography>)
            //         }
            //     </CardContent>
            //     <CardActions>
            //         <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
            //     </CardActions>
            // </Card>
        )
    }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(SignIn)