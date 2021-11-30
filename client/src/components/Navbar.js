import '../stylesheet/Navbar.css'
import { Link, useHistory } from 'react-router-dom'
import { setUserinfo, setIsLogin } from '../redux/action'
import { useDispatch } from 'react-redux'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import { useState } from 'react'

function Navbar ({ OpenModal, isLogin, userinfo, setUserRoom }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [getShow, getSetShow] = useState(false)
  const toggleHandle = () => {
    getSetShow(!getShow)
  }
  gsap.registerPlugin(ScrollTrigger)
  const showAnim = gsap.from('.navbar', {
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1)

  ScrollTrigger.create({
    start: 'top top',
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  })

  const logout = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/logout`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
      .then((data) => {
        dispatch(setUserinfo({}))
        dispatch(setIsLogin(false))
        localStorage.clear()
        history.push('/')
      })
      .catch((err) => {
        if (err) console.log(err)
      })
  }
  const chatList = async () => {
    await axios.get('http://localhost:80/chat/room', {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
      .then(data => {
        setUserRoom(data.data)
      })
  }

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='container__logo'>
          <Link to='/' className='runners_High'>Runner's High</Link>
        </div>
        {/* <div className={getShow ? 'navbar_togglebutton' : 'navbar_link' }> */}
        <div className={getShow ? 'navbar_link active' : 'navbar_link'}>
          <Link to='/main'>러너 모집</Link>
          <Link to='/create'>글쓰기</Link>
          <Link to='/chats' onClick={chatList}>채팅하기</Link>
          {isLogin
            ? <><Link to='/mypage'>마이페이지</Link><div onClick={logout}>로그아웃 </div></>
            : <div onClick={OpenModal}>로그인</div>}
        </div>
        <div className='navbar_togglebutton'>

          <i className='fas fa-bars' onClick={toggleHandle} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
