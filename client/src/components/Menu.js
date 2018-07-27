import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {AppBar, Toolbar, Typography, IconButton, Button, SvgIcon} from '@material-ui/core'
import auth from './../auth/auth-helper'

const isActive = (history, path) => {
    if (history.location.pathname === path)
        return { color: '#FF1744' }
    else
        return { color: '#ffffff' }
}

const Menu = withRouter((({history}) =>{
    <AppBar position="static">
      <Toolbar>
        <Typography id='title' type="title" color="inherit">
          EYEPETIZER
        </Typography>
        <Link to="/">
          <IconButton>
            <SvgIcon color='primary' style={{fontSize: 30}}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
          </IconButton>
        </Link>

        {
            auth.isAuthenticated() && (
                <span>
                    <Link to={'/user/'+auth.isAuthenticated().user._id}>
                    <Button style={isActive(history, '/user/'+auth.isAuthenticated().user._id)}>My Profile</Button>
                    <Button color='inherit' onClick={()=>{
                        auth.signOut(()=>{history.push('/')})
                    }}>Log Out</Button>
                    </Link>
                </span>
            )
        }
      </Toolbar>
    </AppBar>;
}))

export default Menu;
