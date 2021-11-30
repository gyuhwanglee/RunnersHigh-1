import React from 'react'
import '../stylesheet/comment.css'
import Avatar from '@mui/material/Avatar'
// import Footer from './Footer'
//124123123123
function comment ({ comment }) {
  return (
    <div className='comment_container'>
      <section className='comment_section'>
        <Avatar
          src={comment.user.image_url}
          sx={{ width: 40, height: 40 }}
        />
        <div className='comment_emoticon'>
          <span>{comment.user.nickname}</span>
          <div className='comment_comment'>{comment.comment}~</div>
        </div>
      </section>
    </div>
  )
}

export default comment
