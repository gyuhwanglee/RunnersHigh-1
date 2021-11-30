// GET message
const { chatting, user } = require('../../models')
const { isAuthorized } = require('../../functions/token')

module.exports = async (req, res) => {
  console.log(req.params)
  const accessTokenData = isAuthorized(req)
  try {
    if (!accessTokenData) {
      res.status(401).send({ message: '유효하지 않은 토큰입니다' })
    } else {
      const chatInfo = await chatting.findAll({
        where: {
          roomId: req.params.roomid
        },
        include: [
          { model: user }
        ]
      })
      res.status(200).send({ data: chatInfo, message: '룸에대한 채팅 목록을 가져왔습니다' })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}
