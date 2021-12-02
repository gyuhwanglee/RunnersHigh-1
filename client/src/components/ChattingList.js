import '../stylesheet/chat.css'
function ChattingList ({ chattingRender, inputHandler, msg, sendMsg }) {
  return (
    <div className='chat_room'>
      <div className='chat_room_show'>
        <div className='chat_room_detail' />
        {chattingRender()}
      </div>
      <div className='chat_room_post'>
        <input onChange={inputHandler} value={msg} placeholder='채팅을 시작하세요' />
        <button onClick={sendMsg}>전송</button>
      </div>
    </div>
  )
}

export default ChattingList
