import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Card, Typography,Divider} from '@material-ui/core'
import auth from './../auth/auth-helper'
import PostList from './PostList'
import NewPost from './NewPost'
import {listNewsFeed} from './api-post'

const styles = theme => ({
    card: {
        margin: 'auto',
        paddingTop: 0,
        paddingBottom: theme.spacing.unit * 3
    },
    title: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
        color: theme.palette.openTitle,
        fontSize: '1em'
    },
    media: {
        minHeight: 330
    }
})
class NewsFeed extends Component {
    state = {
        posts: []
    }
    loadPosts = () => {
        const jwt = auth.isAuthenticated()
        listNewsFeed({
            userId: jwt.user._id
        }, {
                t: jwt.token
            }).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.setState({ posts: data })
                }
            })
    }
    componentDidMount = () => {
        this.loadPosts()
    }
    addPost = (post) => {
        const updatedPosts = this.state.posts
        updatedPosts.unshift(post)
        this.setState({ posts: updatedPosts })
    }
    removePost = (post) => {
        const updatedPosts = this.state.posts
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        this.setState({ posts: updatedPosts })
    }
    render() {
        const { classes } = this.props
        return (
            <Card className={classes.card}>
                <Typography type="title" className={classes.title}>
                    NewsFeed
        </Typography>
                <Divider />
                <NewPost addUpdate={this.addPost} />
                <Divider />
                <PostList removeUpdate={this.removePost} posts={this.state.posts} />
            </Card>
        )
    }
}
NewsFeed.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewsFeed)