import '../stylesheet/chat.css'
import React, { useEffect, useRef, useState } from 'react'
import ChattingList from '../components/ChattingList'
import SelectUser from '../components/SelectUser'
import { Link } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'
import Avatar from '@mui/material/Avatar'
function Chats ({ userRoom, userinfo }) {
  const [select, setSelect] = useState(false)
  const [chattings, setChattings] = useState([])
  const [msg, setMsg] = useState('')
  const urlArray = window.location.href.split('/')
  const currentRoom = Number(urlArray[urlArray.length - 1])
  const socketRef = useRef()
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  useEffect(() => {
    scrollToBottom()
  }, [chattings])

  useEffect(() => {
    socketRef.current = io.connect(`${process.env.REACT_APP_API_URL}`)
    return () => socketRef.current.disconnect()
  }, [])

  useEffect(() => {
    socketRef.current.on('message', (data) => {
      console.log(data)
      setChattings([...chattings, data])
    })
  }, [chattings])
  // const a = () => {
  //   socketRef.current = io.connect(`${process.env.REACT_APP_API_URL}`)
  //   socketRef.current.on('message', (data) => {
  //     setChattings([...chattings, data])
  //   })
  // }
  // useEffect(() => {
  //   a()
  //   return () => {
  //     socketRef.current.disconnect()
  //   }
  // }, [chattings])

  const selectUser = async (roomId) => {
    const chatList = await axios.get(`${process.env.REACT_APP_API_URL}/chat/message/${roomId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    await socketRef.current.emit('joinRoom', { roomId })
    await socketRef.current.on('joinRoom', message => {
      console.log(message)
    })
    await setChattings([...chatList.data.data])
    await setSelect(true)
  }
  const chattingRender = () => {
    return (
      chattings.map((el, idx) =>
        <>
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
                    <div className='chat_room_text_mine'>{el.chat} </div>
                  </div>
                  <div className='chat_room_image_mine' />
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
              <div ref={messagesEndRef} />
            </div>
          </div>
        </>
      )
    )
  }

  const inputHandler = (e) => {
    setMsg(e.target.value)
  }
  const sendMsg = async () => {
    await socketRef.current.emit('message', { chat: msg, roomId: currentRoom, user: { nickname: userinfo.nickname, id: userinfo.id, image_url: userinfo.image_url } })
    await axios.post(`${process.env.REACT_APP_API_URL}/chat/message`, { chat: msg, roomId: currentRoom },
      {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
    await setMsg('')
  }
  return (
    <div className='chat_container'>
      <div className='chat_container2'>
        <div className='chat_sidebar'>
          {userRoom.map((el) =>
            <div>
              <Avatar
                alt='Remy Sharp'
                src={el.user.image_url}
                sx={{ width: 35, height: 40 }}
              />
              <Link
                to={`/chats/${el.roomId}`}
                onClick={() => selectUser(el.roomId)} key={el.pairId}
              >
                {el.user.nickname}
              </Link>
            </div>
          )}

        </div>
        {select
          ? <ChattingList
              chattingRender={chattingRender}
              msg={msg}
              inputHandler={inputHandler}
              sendMsg={sendMsg}
            />
          : <SelectUser />}
      </div>
    </div>
  )
}

export default Chats
