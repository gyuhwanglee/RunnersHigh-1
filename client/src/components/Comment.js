import React from 'react'
import '../stylesheet/comment.css'
import Footer from './Footer'
function comment () {
  return (
    <div className='comment_container'>
      <div className='comment_div'>
        <input className='comment_input' placeholder='댓글을 입력하세요' />
        <button className='comment_submit'>입력</button>
      </div>
      <section className='comment_section'>
        <div className='comment_emoticon'>
          emoticon
          <span>gyuhwang</span>
        </div>
        <div className='comment_comment'>댓글이다~~~~~~~~~~~~</div>
      </section>
      <section className='comment_section'>
        <div className='comment_emoticon'>
          emoticon
          <span>gyuhwang</span>
        </div>
        <div className='comment_comment'>댓글이다~~~~~~~~~~~~</div>
      </section>
      <section className='comment_section'>
        <div className='comment_emoticon'>
          emoticon
          <span>gyuhwang</span>
        </div>
        <div className='comment_comment'>댓글이다~~~~~~~~~~~~</div>
      </section>
      <section className='comment_section'>
        <div className='comment_emoticon'>
          emoticon
          <span>gyuhwang</span>
        </div>
        <div className='comment_comment'>댓글이다~~~~~~~~~~~~</div>
      </section>
      <section className='comment_section'>
        <div className='comment_emoticon'>
          emoticon
          <span>gyuhwang</span>
        </div>
        <div className='comment_comment'>댓글이다~~~~~~~~~~~~</div>
      </section>
      <Footer />
    </div>
  )
}

export default comment
