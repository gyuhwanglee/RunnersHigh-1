// 메인페이지 게시물 조회

const { post, user } = require('../../models')

module.exports = async (req, res) => {
  const posts = await post.findAll({
    include: [
      { model: user, attributes: ['nickname', 'image_url'] }
    ],
    order: [['id', 'DESC']] // 내림 차순으로 정렬
  })
  res.status(200).send({ data: posts, message: '전체 게시물 조회에 성공했습니다' })
}
