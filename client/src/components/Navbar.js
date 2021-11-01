import '../stylesheet/Navbar.css'
import { Link } from 'react-router-dom'
function Navbar ({ OpenModal }) {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='container__logo'>
          <Link to='/' className='runners_High'>Runner's High</Link>
        </div>
        <div className='navbar_link'>
          <Link to='/main'>러너 모집</Link>
          <Link to='/create'>글쓰기</Link>
          <Link to='/chat'>채팅하기</Link>
          <div onClick={OpenModal}>로그인</div>
        </div>

      </div>
    </div>
  )
}

export default Navbar
