import { Link } from 'react-router-dom'
import '../stylesheet/signup.css'

function Signup ({ ChangeSelect }) {
  return (
    <div className='signup_container'>
      <h3 className='signup_title'>
        Signup
      </h3>
      <form className='signup_form'>
        <input placeholder='Email' />
        <input placeholder='Nickname' />
        <input placeholder='Password' />
        <input placeholder='Confirm Password' />
      </form>
      <button className='signup_btn'>Signup</button>
      <div onClick={ChangeSelect} className='signup_tosignup'>아이디가 있으십니까?</div>
    </div>
  )
}

export default Signup
