// 댓글 작성

const { comment } = require('../../models')
const { isAuthorized } = require('../../functions/token')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req)

  if (!accessTokenData) {
    res.status(401).send({ message: '유효하지 않은 토큰입니다' })
  } else {
    await comment.create({
      comment: req.body.comment,
      userId: accessTokenData.id,
      postId: req.params.postid
    })
    res.status(201).send({ message: '댓글 작성에 성공했습니다' })
  }
}
