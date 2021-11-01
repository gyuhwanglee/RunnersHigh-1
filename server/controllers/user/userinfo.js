// 회원정보 조회
const { isAuthorized } = require('../../functions/token')
const { user } = require('../../models')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req)
  try {
    if (!accessTokenData) {
      res.status(401).send({ message: '유효하지 않은 토큰입니다' })
    } else {
      const userInfo = await user.findOne({
        where: {
          id: accessTokenData.id
        }
      })
      delete userInfo.dataValues.password
      res.status(200).send({ data: userInfo.dataValues, message: '회원정보 조회에 성공했습니다' })
    }
  } catch (error) {
    console.log(error)
  }
}
