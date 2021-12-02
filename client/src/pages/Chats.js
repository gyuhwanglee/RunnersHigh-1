import '../stylesheet/chat.css'

import React, { useEffect, useRef, useState } from 'react'
import ChattingList from '../components/ChattingList'
import SelectUser from '../components/SelectUser'
import { Link } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'
function Chats ({ userRoom, userinfo }) {
  const [select, setSelect] = useState(false)
  const [chattings, setChattings] = useState([])
  const [msg, setMsg] = useState('')
  const urlArray = window.location.href.split('/')
  const currentRoom = Number(urlArray[urlArray.length - 1])
  const socketRef = useRef()

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
        <div key={idx}>
          <div>{el.user.nickname}</div>
          <div className='chat_room_text'>{el.chat}</div>
        </div>
      )
    )
  }

  const inputHandler = (e) => {
    setMsg(e.target.value)
  }

  const sendMsg = async () => {
    await socketRef.current.emit('message', { chat: msg, roomId: currentRoom, user: { nickname: userinfo.nickname } })
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
            <Link to={`/chats/${el.roomId}`} onClick={() => selectUser(el.roomId)} key={el.pairId}> {el.user.nickname} </Link>
          )}
        </div>
        {select ? <ChattingList chattingRender={chattingRender} msg={msg} inputHandler={inputHandler} sendMsg={sendMsg} /> : <SelectUser />}
      </div>
    </div>
  )
}

export default Chats
