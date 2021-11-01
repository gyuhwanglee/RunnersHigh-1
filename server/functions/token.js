require('dotenv').config()
const { sign, verify } = require('jsonwebtoken')

module.exports = {
  signAccessToken: (data) => {
    return sign(data, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
  },
  sendAccessToken: (res, accessToken) => {
    res.status(200).send({ data: { accessToken }, message: '로그인에 성공했습니다.' })
  },
  isAuthorized: (req) => {
    const authorization = req.headers.authorization
    if (!authorization) {
      return null
    }
    const token = authorization.split(' ')[1]
    try {
      return verify(token, process.env.ACCESS_TOKEN)
    } catch (err) {
      return null
    }
  }
}
