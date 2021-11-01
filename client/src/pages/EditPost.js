import React from 'react'
import '../stylesheet/CreatePost.css'
function EditPost () {
  return (
    <div className='create_container'>
      <form className='create_form'>
        <div className='create_title'>
          <span>제목</span>
          <input type='text' placeholder='제목을 입력하세요' />
        </div>
        <div className='create_checkbox'>
          <span>썸넬</span>
          <input type='checkbox' />
          <span>이미지선택</span>
          <input type='checkbox' />
          <span>기본이미지</span>
        </div>
        <div className='create_main_text'>
          <span>본문</span>
          <textarea placeholder='본문을 입력하세요' />
        </div>
        <div className='create_map'>
          <span>코스</span>
          <div>지도 api</div>
        </div>
        <button className='create_button'>게시글 수정</button>
      </form>
    </div>
  )
}

export default EditPost
