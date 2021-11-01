// 회원가입

const { user } = require('../../models')

module.exports = async (req, res) => {
  const { email, nickname, password } = req.body

  if (!email || !nickname || !password) {
    res.status(422).send({ message: '이메일, 비밀번호, 닉네임 정보가 필요합니다' })
  }

  try {
    const userInfo = await user.findOne({
      where: {
        email: email
      }
    })
    if (!userInfo) {
      await user.create({
        email: email,
        password: password,
        nickname: nickname,
        social_type: 'local'
      })
      res.status(201).send({ message: '회원가입 성공' })
    } else {
      res.status(409).send({ message: '이미존재하는 이메일 입니다' })
    }
  } catch (error) {
    console.log(error)
  }
}
