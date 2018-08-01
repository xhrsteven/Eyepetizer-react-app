//Sign In /Register page view
import React, {Component} from 'react'
import {AppBar, Tab, Tabs,Card, CardAction, CardContent, TextField, Button,Typography, Icon} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { signIn } from './../auth/api-auth'
import auth from './../auth/auth-helper'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'



export default SignIn