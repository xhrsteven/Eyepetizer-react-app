import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import background from './../assets/images/loginBackground.jpg'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import auth from './../auth/auth-helper'
import FindPeople from './../user/FindPeople'
import Newsfeed from './../post/Newsfeed'

const styles = theme => ({

  root: {
    flexGrow: 1,
    margin:0,
    padding: 0,
    height: 1000, 
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    },
  
  card: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: 50
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 500
  }
})

class Home extends Component {
  state = {
    defaultPage: true
  }
  init = () => {
    if(auth.isAuthenticated()){
      this.setState({defaultPage: false})
    }else{
      this.setState({defaultPage: true})
    }
  }
  componentWillReceiveProps = () => {
    this.init()
  }
  componentDidMount = () => {
    this.init()
  }
  render() {
    const {classes} = this.props
    return <div className={classes.root}>
        {this.state.defaultPage && <div>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <Typography type="display2" align="center" className={classes.title}>
                  <h1>Eyepetizer</h1>
                  </Typography>
                  <CardMedia className={classes.media} image={background} title="rainer" />
                  <CardContent>
                    <Typography type="body1" component="p" align="center">
                  <h2>A Social Application That Brings People Together</h2>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>}
        {!this.state.defaultPage && <Grid container spacing={24}>
            <Grid item xs={9} sm={7}>
              <Newsfeed />
            </Grid>
            <Grid item xs={3} sm={5}>
              <FindPeople />
            </Grid>
          </Grid>}
      </div>;
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
