const router = require('express').Router()
const controllers = require('../controllers')
const upload = require('../modules/multer')

// post
router.get('/:userid', controllers.mypost) // 개별 게시물
router.get('/', controllers.ourpost) // 전체 게시물
router.post('/', upload.single('postimage'), controllers.post) // 게시물 작성
router.patch('/', controllers.postedit) // 게시물 수정
router.delete('/:postid', controllers.postdelete) // 게시물 삭제
router.get('/comments/:postid', controllers.comments) // 게시물의 댓글 조회
router.post('/comment/:postid', controllers.comment) // 게시물의 댓글 작성

module.exports = router
