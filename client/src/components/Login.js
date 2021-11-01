import { Link } from 'react-router-dom'
import '../stylesheet/login.css'

function Login ({ ChangeSelect }) {
  return (
    <div className='login_container'>
      <h3 className='login_title'>
        Login
      </h3>
      <form className='login_form'>
        <input placeholder='Email' />
        <input placeholder='Password' />
      </form>
      <button className='login_btn'>Login</button>
      <div>소셜로그인 자리 </div>
      <div onClick={ChangeSelect} className='login_tosignup'>회원이 아니십니까?</div>
    </div>
  )
}

export default Login
