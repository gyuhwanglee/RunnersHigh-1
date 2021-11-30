import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import { red } from '@mui/material/colors'
import Comment from '../components/Comment'
import '../stylesheet/detailpost.css'
import Map from '../components/Map'
import CommentInput from '../components/CommentInput'
import axios from 'axios'

import { useHistory } from 'react-router'
function DetailPost ({ post, userinfo, isLogin, OpenModal }) {
  const [comments, setComments] = useState([])
  const history = useHistory()
  const date = post.createdAt.slice(0, 10)
  useEffect(() => {
    window.scrollTo(0, 0)
    getComments()
  }, [])

  const getComments = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/comments/${post.id}`)
      .then((data) => {
        // if (data.data.comments.length !== 0) {
        setComments(data.data.comments)

        // }
      })
  }
  const deletePost = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/posts/${post.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
        'Content-Type': 'application/json'

      }
    })
      .then((data) => history.push('/main'))
  }

  const chattingHandle = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/chat/room`, { pairId: post.user.userId }, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    }).then((data) => console.log(data))
  }

  return (
    <div className='detail_container'>
      <h1 className='detail_title'>{post.title}</h1>
      <div className='detail_content'>
        <img src={post.thumbnail_url} className='detail_image ' />
        <div className='detail_map'>
          <Map getLatitude={post.latitude} getLongitude={post.longitude} />
        </div>
        <div className='detail_span'>
          <div className='detail_span_block'>
            <Avatar sx={{ bgcolor: red[500] }} aria-label='your image' src={post.user.image_url} />
            <span>{post.user.nickname}</span>
            <i className='fas fa-comment-dots' onClick={chattingHandle} />
          </div>
          <span>{date}</span>
        </div>
        <div className='button_button'>
          {post.userId === userinfo.id
            ? <div className='btn_btn'><div onClick={() => history.push('/editpost')}>수정</div>
              <div onClick={deletePost}>삭제</div>
            </div>
            : null}
        </div>
        <div className='detail_text'>{post.text}</div>

      </div>
      <CommentInput getComments={getComments} post={post} userinfo={userinfo} isLogin={isLogin} OpenModal={OpenModal} />
      {comments.length === 0
        ? null
        : comments.map((comment) => <Comment comment={comment} key={comment.id} />)}

    </div>
  )
}

export default DetailPost
