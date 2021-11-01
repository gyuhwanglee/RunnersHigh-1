import '../stylesheet/chat.css'
function Chat () {
  return (
    <div className='chat_container'>
      <div className='chat_container2'>
        <div className='chat_sidebar'>
          <div> 이미지 </div>
          <div> 이미지 </div>
        </div>
        <div className='chat_room'>
          <div className='chat_room_show'>
            <div className='chat_room_detail'>
              <div className='chat_room_image'>이미지<span> 한성린 </span></div>
              <div className='chat_room_text'>안녕하세요 참가하려고 합니다. </div>
            </div>
          </div>
          <div className='chat_room_post'>
            <input placeholder='채팅을 시작하세요' />
            <button>전송</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
