module.exports = {
  // user
  login: require('./user/login'),
  logout: require('./user/logout'),
  signout: require('./user/signout'),
  signup: require('./user/signup'),
  userinfo: require('./user/userinfo'),
  userinfoedit: require('./user/userinfoedit'),
  userimage: require('./user/userimage'),
  // post
  mypost: require('./post/mypost'),
  ourpost: require('./post/ourpost'),
  post: require('./post/post'),
  postedit: require('./post/postedit'),
  postdelete: require('./post/postdelete'),
  // comment
  comment: require('./comment/comment'),
  comments: require('./comment/comments')
}
