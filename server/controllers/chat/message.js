// POST message
const { chatting } = require('../../models')
const { isAuthorized } = require('../../functions/token')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req)
  try {
    if (!accessTokenData) {
      res.status(401).send({ message: '유효하지 않은 토큰입니다' })
    } else {
      await chatting.create({
        userId: accessTokenData.id,
        chat: req.body.chat,
        roomId: req.body.roomId
      })
      res.status(201).send({ message: '채팅메시지가 저장되었습니다' })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}
