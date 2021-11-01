import React from 'react'
import Comment from '../components/Comment'
import '../stylesheet/detailpost.css'
function DetailPost () {
  return (
    <div className='detail_container'>
      <h1 className='detail_title'>title</h1>
      <div className='detail_span'>
        <span>작성자</span>
        <span>작성일</span>
      </div>
      <div className='detail_content'>
        <div className='detail_image'>이미지</div>
        <div className='detail_map'>지도api</div>
        <div className='detail_text'>본문</div>
      </div>
      <Comment />
    </div>
  )
}

export default DetailPost
