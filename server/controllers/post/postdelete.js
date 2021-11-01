// 게시물 삭제

const { post } = require('../../models')
const { isAuthorized } = require('../../functions/token')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req)

  if (!accessTokenData) {
    res.status(401).send({ message: '유효하지 않은 토큰입니다' })
  } else {
    await post.destroy({
      where: {
        id: req.params.postid
      }
    })
    res.status(200).send({ message: '게시물 삭제에 성공했습니다' })
  }
}
