import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from './api-auth.js'
import background from "./../assets/images/loginBackground.jpg";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
    height: 1000,
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  card: {
    maxWidth: 400,
    margin: 'auto',
    textAlign: 'center',
    marginTop: 100,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
})

class Signin extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  }

  clickSubmit = () => {
    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.authenticate(data, () => {
          this.setState({redirectToReferrer: true})
        })
      }
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    }
    const {redirectToReferrer} = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    return <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <i className="material-icons">remove_red_eye</i>
            <Typography type="display1" component="h1" align="center" className={classes.title}>
            <h1>Welcome Back! </h1><br />
            <h1>Log in Now</h1>
            </Typography>
            <Typography type="headline" component="p" align="center" className={classes.title}>
              Access Eyepetizer's best ideas with a free account
            </Typography>
            <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange("email")} margin="normal" />
            <br />
            <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange("password")} margin="normal" />
            <br /> {this.state.error && <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {this.state.error}
              </Typography>}
          </CardContent>
          <CardActions>
            <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>
              Log in
            </Button>
          </CardActions>
          <a href="/signup">Not on Eyepetizer yet? Sign up</a>
        </Card>
      </div>;
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signin)
