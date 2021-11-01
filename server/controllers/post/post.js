// 게시물 작성

const { post } = require('../../models')
const { isAuthorized } = require('../../functions/token')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req)

  if (!accessTokenData) {
    res.status(401).send({ message: '유효하지 않은 토큰입니다' })
  } else {
    if (!req.file) {
      await post.create({
        title: req.body.title,
        thumbnail_url: '.com',
        text: req.body.text,
        location: req.body.location,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        userId: accessTokenData.id
      })
      res.status(201).send({ message: '게시물 작성에 성공했습니다' })
    } else {
      await post.create({
        title: req.body.title,
        thumbnail_url: req.file.location,
        text: req.body.text,
        location: req.body.location,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        userId: accessTokenData.id
      })
      res.status(201).send({ message: '게시물 작성에 성공했습니다' })
    }
  }
}
