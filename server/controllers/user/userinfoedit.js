// 회원정보 수정
const { user } = require('../../models')
const { isAuthorized } = require('../../functions/token')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req)
  console.log(req.file, req.body)
  if (!accessTokenData) {
    res.status(401).send({ message: '유효하지 않은 토큰입니다' })
  } else {
    if (req.file || !req.body.nickname || !req.body.password) {
      res.status(422).send({ message: '변경할 정보가 필요합니다' })
    } else {
      if (req.file) {
        await user.update({
          image_url: req.file.location
        },
        { where: { id: accessTokenData.id } }
        )
      }
      if (req.body.nickname) {
        await user.update({
          nickname: req.body.nickname
        },
        { where: { id: accessTokenData.id } }
        )
      }
      if (req.body.password) {
        await user.update({
          password: req.body.password
        },
        { where: { id: accessTokenData.id } }
        )
      }
      res.status(201).send({ message: '닉네임, 비밀번호 또는 프로필 이미지 변경에 성공했습니다' })
    }
  }
}
