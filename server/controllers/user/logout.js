// 로그아웃
const { isAuthorized } = require('../../functions/token')
module.exports = (req, res) => {
  const accessToken = isAuthorized(req)

  if (!accessToken) {
    res.status(401).send({ message: '유효하지 않은 토큰입니다' })
  } else {
    res.status(200).send({ message: '로그아웃에 성공했습니다' })
  }
}
