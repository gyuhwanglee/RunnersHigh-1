// 회원정보 수정
const { user } = require('../../models')
const bcrypt = require('bcrypt')
const { isAuthorized } = require('../../functions/token')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req)
  try {
    if (!accessTokenData) { // 토큰이 유효하지 않다면
      return res.status(401).send({ message: '유효하지 않은 토큰입니다' })
    }

    if (req.file || Object.keys(req.body).length > 0) {
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
          password: bcrypt.hashSync(req.body.password, 10)
        },
        { where: { id: accessTokenData.id } }
        )
      }
      const userInfo = await user.findOne({
        where: {
          id: accessTokenData.id
        }
      })
      delete userInfo.dataValues.password
      res.status(201).send({ data: userInfo.dataValues, message: '닉네임, 비밀번호 또는 프로필 이미지 변경에 성공했습니다' })
    } else {
      res.status(422).send({ message: '변경할 정보가 필요합니다' })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

// 일단 토큰이 유효한지 확인한다
// 1. 유효하지않으면 401오 거른다
// 2. 유효하다면
// 2.1

// res.status(201).send({ message: '닉네임, 비밀번호 또는 프로필 이미지 변경에 성공했습니다' })
// res.status(401).send({ message: '유효하지 않은 토큰입니다' })
// res.status(422).send({ message: '변경할 정보가 필요합니다' })
