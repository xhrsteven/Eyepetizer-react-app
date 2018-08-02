import React, {Component} from 'react'
// import { Link}  from 'react-router-dom'
import auth from './../auth/auth-helper'
import { withStyles, Grid } from '../../node_modules/@material-ui/core';
import PropTypes from 'prop-types'
import NewsFeed from '../post/Newsfeed'
import FindPeople from '../user/FindPeople'

const styles = themes =>({
    root: {
        flexGrow: 1,
        margin:30
    }
})
class Home extends Component {
    state = {
        defaultPage: true
    }
    init = () =>{
        if(auth.isAuthenticated()){
            this.setState({defaultPage:false})
        }else{
            this.setState({defaultPage: true})
        }
    }
    //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
    componentWillReceiveProps= ()=> {
        this.init()
    }
    componentDidMount =()=>{
        this.init()
    }
    render(){
        const {classes} = this.props;
        return(
            <div className = {classes.root}>
                {!this.state.defaultPage &&
                    <Grid container spacing ={24}>
                        <Grid item xs={8} sm={7}>
                            <NewsFeed />
                        </Grid>
                        <Grid item xs={6} sm={5}>
                            <FindPeople />
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}

Home.PropTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)