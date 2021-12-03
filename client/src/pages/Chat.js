import '../stylesheet/chat.scss'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
function Chat ({ chatList, setChatList, userinfo, isLogin, OpenModal }) {
  const socketRef = useRef()
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  //  console.log(scrollToBottom())
  useEffect(() => {
    scrollToBottom()
  }, [chatList])

  useEffect(() => {
    socketRef.current = io.connect(`${process.env.REACT_APP_API_URL}`)
    socketRef.current.on('message', (data) => {
      console.log(data)
      setChatList([...chatList, { chat: data.chat, user: { nickname: data.userinfo.nickname, image_url: data.userinfo.image_url, id: data.userinfo.id } }])
    })
    return () => socketRef.current.disconnect()
  }, [chatList])
  const [input, setInput] = useState('')
  const inputHandle = (e) => {
    setInput(e.target.value)
  }
  const render = () => {
    return (
      chatList.map((el, idx) =>
        <div
          className={el.user.id === userinfo.id
            ? 'chat_room_detail_mine '
            : 'chat_room_detail'}
          key={idx}

        >
          <div className='chat_message_container'>
            {el.user.id === userinfo.id
              ? <>
                <div className='test_mine'>
                  <div className='chat_room_nickname_mine'> {el.user.nickname} </div>
                  <div className='chat_room_text_mine'>{el.chat} </div>
                </div>
                <div className='chat_room_image_mine'>
                  <Avatar
                    alt='Remy Sharp'
                    src={userinfo.image_url}
                    sx={{ width: 45, height: 50 }}
                  />

                </div>
                <div ref={messagesEndRef} />
              </>
              : <>
                <div className='chat_room_image'>
                  <Avatar
                    alt='Remy Sharp'
                    src={el.user.image_url}
                    sx={{ width: 45, height: 50 }}
                  />
                </div>
                <div className='test'>
                  <div className='chat_room_nickname'> {el.user.nickname} </div>
                  <div className='chat_room_text'>{el.chat} </div>
                </div>
                <div ref={messagesEndRef} />

                </>}
          </div>
        </div>
      )
    )
  }

  const sendMsg = () => {
    socketRef.current.emit('message', { chat: input, userinfo: userinfo })
    axios.post(`${process.env.REACT_APP_API_URL}/chat/message`,
      { chat: input },
      {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      })
    setInput('')
  }
  const enterClick = (e) => {
    if (e.key === 'Enter') {
      sendMsg()
    }
  }

  return (

    <div className='chat_container'>
      <div className='chat_container2'>
        <div className='chat_room'>
          <div className='chat_room_show'>
            {render()}
          </div>
          {isLogin
            ? <div className='chat_room_post'>
              <input
                type='text'
                placeholder='채팅을 시작하세요'
                onChange={inputHandle}
                value={input}
                onFocus
                onKeyPress={enterClick}
              />
              <button type='submit' onClick={sendMsg}>전송</button>
            </div>
            : <div className='chat_room_post'>
              <input
                type='text'
                placeholder='채팅에 참여하려면 로그인이 필요합니다.'
                onFocus
              />
              <button onClick={OpenModal}>로그인하기</button>
            </div>}
        </div>
      </div>
    </div>

  )
}

export default Chat
