import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import postCtrl from '../controllers/post.controller'

const router = express.Router()

router.route('/api/posts/new/:userId')
    .post(authCtrl.requireSignIn, postCtrl.create)

router.route('/api/posts/photo/:postId')
    .get(postCtrl.photo)

router.route('/api/posts/by/:userId')
    .get(authCtrl.requireSignIn, postCtrl.listByUser)

router.route('/api/posts/feed/:userId')
    .get(authCtrl.requireSignIn, postCtrl.listNewsFeed)

router.route('/api/posts/like')
    .put(authCtrl.requireSignIn, postCtrl.like)

router.route('/api/posts/unlike')
    .put(authCtrl.requireSignIn, postCtrl.unlike)

router.route('/api/posts/comment')
    .put(authCtrl.requireSignIn, postCtrl.comment)

router.route('/api/posts/unComment')
    .put(authCtrl.requireSignIn, postCtrl.unComment)

router.route('/api/posts/:postId')
    .delete(authCtrl.requireSignIn, postCtrl.isPoster, postCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postByID)

export default router;