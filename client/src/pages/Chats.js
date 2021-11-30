import '../stylesheet/chat.css'

import React, { useEffect, useRef, useState } from 'react'
import ChattingList from '../components/ChattingList'
import SelectUser from '../components/SelectUser'
import { Link } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'
function Chats ({ userRoom }) {
  const [select, setSelect] = useState(false)
  const [chattings, setChattings] = useState([])
  const [msg, setMsg] = useState('')
  const socketRef = useRef()
  const urlArray = window.location.href.split('/')
  const currentRoom = Number(urlArray[urlArray.length - 1])

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:80')
    socketRef.current.on('message', (msg) => {
      setChattings([...chattings, msg])
    })
  }, [])

  const selectuser = async (roomId) => {
    const chatList = await axios.get(`http://localhost:80/chat/message/${roomId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
    await socketRef.current.emit('joinRoom', { roomId: roomId })
    await socketRef.current.on(roomId, (message) => {
      console.log(message)
    })
    await setChattings(chatList.data.data)
    await setSelect(true)
  }

  console.log(chattings)

  const render = () => {
    return (
      chattings.map((el, idx) =>
        <div key={idx}>
          {/* <div> {el.user.nickname} </div> */}
          <div className='chat_room_text'>{el.chat}</div>
        </div>
      )
    )
  }
  const inputMsg = (e) => {
    setMsg(e.target.value)
  }
  const sendMsg = (e) => {
    console.log('클릭')
    socketRef.current.emit('message', { chat: msg, roomId: currentRoom })
    setMsg('')
  }

  return (
    <div className='chat_container'>
      <div className='chat_container2'>
        <div className='chat_sidebar'>
          {userRoom.map((el) =>
            <Link to={`/chats/${el.roomId}`} onClick={(() => { selectuser(el.roomId) })} key={el.pairId}> {el.user.nickname} </Link>
          )}
        </div>
        {select ? <ChattingList render={render} sendMsg={sendMsg} inputMsg={inputMsg} msg={msg} /> : <SelectUser />}
      </div>
    </div>
  )
}

export default Chats
