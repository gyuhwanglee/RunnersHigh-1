// 댓글 조회
// 1. req,params.postid가 들어온다
// 2. 그러면 postid로 comments테이블에 postid를 기준으로 데이테를 뽑아준다

const { comment, post, user } = require('../../models')

module.exports = async (req, res) => {
  const postInfo = await post.findOne({ // 게시물 정보
    include: [
      { model: user, attributes: ['nickname', 'image_url'] }
    ],
    where: {
      id: req.params.postid
    }
  })
  const comments = await comment.findAll({ // 댓글정보
    include: [
      { model: user, attributes: ['nickname', 'image_url'] }
    ],
    where: {
      postId: req.params.postid
    }
  })
  res.status(200).send({ postInfo, comments, message: '댓글 조회에 성공했습니다' })
}
