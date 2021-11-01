// 개별 게시물 조회
// 1. params로 유저의 아이디가 들어온다
// 2. 그럼 그 id값으로 posts 테이블에 userid와 params로 들어온 id값이 같은것만 조회한다.
// 3. 그리고 조회한 데이터를 응답으로 보낸준다

const { post, user } = require('../../models')
const { isAuthorized } = require('../../functions/token')

module.exports = async (req, res) => {
  console.log(req.params)
  const accessTokenData = isAuthorized(req)

  if (!accessTokenData) {
    res.status(401).send({ message: '유효하지 않은 토큰입니다' })
  } else {
    const myPosts = await post.findAll({
      include: [
        { model: user, attributes: ['nickname', 'image_url'] }
      ],
      where: {
        userId: req.params.userid
      },
      order: [['id', 'DESC']]
    })
    res.status(200).send({ data: myPosts, message: '개별 게시물 조회에 성공했습니다' })
  }
}
