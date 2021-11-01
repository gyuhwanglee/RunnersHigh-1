import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Chat from './pages/Chat'
import CreatePost from './pages/CreatePost'
import DetailPost from './pages/DetailPost'
import EditPost from './pages/EditPost'
import Home from './pages/Home'

import MainPage from './pages/MainPage'
import MyPage from './pages/MyPage'
import EditMyPage from './pages/EditMyPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DetailEditPost from './pages/DetailEditPost'
import LoginModal from './components/LoginModal'
function App () {
  console.log('hello')
  const [showModal, setShowModal] = useState(false)
  const OpenModal = () => {
    setShowModal(!showModal)
  }
  return (
    <div className='page_container'>
      <Router>
        <LoginModal showModal={showModal} OpenModal={OpenModal} />
        <Navbar OpenModal={OpenModal} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/main' exact component={MainPage} />
          <Route path='/create' exact component={CreatePost} />
          <Route path='/editpost' exact component={EditPost} />
          <Route path='/detail' exact component={DetailPost} />
          <Route path='/detailedit' exact component={DetailEditPost} />
          <Route path='/loginmodal' exact component={LoginModal} />
          <Route path='/chat' exact component={Chat} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  )
}

export default App
