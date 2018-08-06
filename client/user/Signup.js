import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-user.js'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import {Link} from 'react-router-dom'
import background from './../assets/images/loginBackground.jpg'

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
    margin: "auto",
    textAlign: "center",
    marginTop: 100,
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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing.unit * 2
  }
});

class Signup extends Component {
  state = {
      name: '',
      password: '',
      email: '',
      open: false,
      error: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  clickSubmit = () => {
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', open: true})
      }
    })
  }

  render() {
    const {classes} = this.props
    return <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <i className="material-icons">remove_red_eye</i>
            <Typography type="display1" component="h1" align="center" className={classes.title}>
            <h1>Sign up to see more</h1>
            </Typography>
            <Typography type="headline" component="h1" align="center" className={classes.title}>
              Access Eyepetizer's best ideas with a free account
            </Typography>
            <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange("name")} margin="normal" />
            <br />
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
              Continue
            </Button>
          </CardActions>
          <a href="/signin">Log in if you already have an account</a>
        </Card>
        <Dialog open={this.state.open} disableBackdropClick={true}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New account successfully created.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/signin">
              <Button color="primary" autoFocus="autoFocus" variant="raised">
                Log In Here
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>;
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)
