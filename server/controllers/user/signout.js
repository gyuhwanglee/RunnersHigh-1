// 회원탈퇴
const { isAuthorized } = require('../../functions/token')
const { user, post, comment, chatting, user_room } = require('../../models')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req)
  try {
    if (!accessTokenData) {
      res.status(401).send({ message: '회원탈퇴 성공했습니다' })
    } else {
      await user_room.destroy({
        where: {
          userId: accessTokenData.id
        }
      })
      await user_room.destroy({
        where: {
          pairId: accessTokenData.id
        }
      })
      await chatting.destroy({
        where: {
          userId: accessTokenData.id
        }
      })
      await comment.destroy({
        where: {
          userId: accessTokenData.id
        }
      })
      await post.destroy({
        where: {
          userId: accessTokenData.id
        }
      })
      await user.destroy({
        where: {
          id: accessTokenData.id
        }
      })
      res.status(200).send({ message: '회원탈퇴 성공했습니다' })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}
