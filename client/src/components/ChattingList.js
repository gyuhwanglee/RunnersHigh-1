import '../stylesheet/chat.css'
function ChattingList ({ render, inputMsg, sendMsg, msg }) {
  return (
    <div className='chat_room'>
      <div className='chat_room_show'>
        <div className='chat_room_detail'>
          {render()}
        </div>
      </div>
      <div className='chat_room_post'>
        <input placeholder='채팅을 시작하세요' onChange={inputMsg} value={msg} />
        <button onClick={sendMsg}>전송</button>
      </div>
    </div>
  )
}

export default ChattingList
