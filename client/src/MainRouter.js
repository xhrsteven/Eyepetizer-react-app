// Basic Server Side Rendering
import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Users from './user/Users'
import SignIn from './components/SignIn'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
// import Menu from './components/Menu'
import PrivateRoute from './auth/PrivateRoute'

class MainRouter extends Component {
    //Remove css style before loading
    // componentDidMount() {
    //     const jssStyles = document.getElementById('jss-server-side')
    //     if (jssStyles && jssStyles.parentNode) {
    //         jssStyles.parentNode.removeChild(jssStyles)
    //     }
    // }
    
    render(){
        return (
            <div>
                
                <Switch>
                    <Route path='/' component={SignIn} />
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/users' component={Users} />                    
                    <PrivateRoute path='/user/edit/:userId' component={EditProfile} />
                    <Route exact path='/user/:userId' component={Profile} />
                </Switch>
            </div>
        )
    }
}

export default MainRouter;
