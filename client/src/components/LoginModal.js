import Login from './Login'
import Signup from './Signup'
import '../stylesheet/loginmodal.css'
import { useState } from 'react'
function LoginModal ({ showModal, OpenModal }) {
  const [selectLogin, setSelectLogin] = useState(false)

  const ChangeSelect = () => {
    setSelectLogin(!selectLogin)
  }
  return (
    <div>
      {showModal
        ? <div className='loginmodal_background'>
          <div onClick={OpenModal}>x</div>
          <div className='loginmodal_container'>
            {selectLogin
              ? <Signup ChangeSelect={ChangeSelect} />
              : <Login ChangeSelect={ChangeSelect} />}
          </div>
        </div>
        : null}
    </div>
  )
}

export default LoginModal
