// 회원탈퇴
const { isAuthorized } = require('../../functions/token')
const { user } = require('../../models')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req)

  if (!accessTokenData) {
    res.status(401).send({ message: '회원탈퇴 성공했습니다' })
  } else {
    await user.destroy({
      where: {
        id: accessTokenData.id
      }
    })
    res.status(200).send({ message: '회원탈퇴 성공했습니다' })
  }
}
