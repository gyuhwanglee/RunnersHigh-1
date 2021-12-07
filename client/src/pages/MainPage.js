import React, { useEffect } from 'react'
import PostListCard from '../components/PostListCard'
import '../stylesheet/mainpage.css'
import Footer from '../components/Footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setPosts } from '../redux/action'
import Category from '../components/Category'
function MainPage () {
  // gsap.registerPlugin(ScrollTrigger)

  let scrollTween

  // function goToSection (i) {
  //   scrollTween = gsap.to(window, {
  //     scrollTo: { y: i * window.innerHeight, autoKill: false },
  //     duration: 1,
  //     onComplete: () => scrollTween = null,
  //     overwrite: true
  //   })
  // }

  // gsap.utils.toArray('.panel').forEach((panel, i) => {
  //   ScrollTrigger.create({
  //     trigger: panel,
  //     start: 'top bottom',
  //     end: '+=200%',
  //     onToggle: self => self.isActive && !scrollTween && goToSection(i)
  //   })
  // })

  const dispatch = useDispatch()
  const postInfo = useSelector((state) => state.postReducer)

  const { posts } = postInfo
  const getPosts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
      .then((data) => {
        dispatch(setPosts(data.data.data))
      })
  }
  useEffect(() => getPosts(), [])

  return (
    <>
      <Category />
      <div className='main_container'>

        {/* <div className='main_serch_div'>
          <input type='text' className='main_serch' placeholder='serch' />
          <button>검색</button>
        </div> */}

        {posts.map((post) => <div className='main_section1 ' key={post.id}><PostListCard post={post} key={post.id} /></div>)}
        {/* {posts.map((post) => <div className='main_section1 panel' key={post.id}><PostListCard post={post} key={post.id} /></div>)} */}
      </div>
      <Footer />
    </>
  )
}

export default MainPage
