import React, { useState, useEffect, history } from 'react'
import { useHistory } from 'react-router'
import PostListCard from '../components/PostListCard'
import '../stylesheet/mypage.css'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import '../stylesheet/signup.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setUserinfo, setPosts, setIsLogin } from '../redux/action'

function MyPage ({ userinfo, posts }) {
  const dispatch = useDispatch()
  const [editProfile, setEditProfile] = useState(false)
  const editHandle = () => {
    setEditProfile(!editProfile)
  }
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm({ mode: 'onChange' })

  const myPage = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/userinfo`, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
      .then((res) => {
        dispatch(setUserinfo(res.data.data))
      })
  }

  const delectUser = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/users/userinfo`, {
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
  }

  const myPostcard = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/${userinfo.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
      .then((res) => {
        dispatch(setPosts(res.data.data))
      })
  }
  const [profileImage, setProfileImage] = useState('')
  const onChangeImage = (e) => {
    setProfileImage(e.target.files[0])
  }
  const history = useHistory()
  useEffect(() => myPage(), [])
  useEffect(() => myPostcard(), [])
  // useEffect(() => myPostcard, [posts])
  const onProfileHandle = (data) => {
    const formData = new FormData()
    formData.append('nickname', data.nickname)
    formData.append('password', data.password)
    formData.append('userimage', profileImage)
    // for (const key of formData.keys()) {
    //   console.log(key)
    // }
    // for (const value of formData.values()) {
    //   console.log(value)
    // }
    axios.patch(`${process.env.REACT_APP_API_URL}/users/userinfo`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
      .then((data) => {
        dispatch(setUserinfo(data.data.data))
        setEditProfile(!editProfile)
      })
  }

  return (
    <div className='mypage_container'>
      {editProfile
        ? <form onSubmit={handleSubmit(onProfileHandle)} className='mypage_profile'>
          <div className='mypage_profile1'>
            <div className='mypage_myimg'>
              <Avatar
                alt='Remy Sharp'
                src={userinfo.image_url}
                sx={{ width: 116, height: 116 }}
              />
              <input
                type='file'
                accept='img/*'
                name='userimage'
                onChange={onChangeImage}
              />
            </div>
          </div>
          <div className='mypage_profile2'>
            <TextField
              margin='normal'
              required
              fullWidth
              id='nickname'
              label='Nickname'
              name='nickname'
              {...register('nickname', {
                required: '닉네임을 입력해주세요.'
                // maxLength: {
                //   value: 10,
                //   message: '10자 미만으로 설정해주세요.'
                // }
              })}
            />
            {errors.nickname && <p>{errors.nickname.message}</p>}
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/,
                  message: '비밀번호는 최소 6자 이상입니다.'
                }
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <TextField
              margin='normal'
              required
              fullWidth
              name='confirm_password'
              label='Confirm Password'
              type='password'
              id='confirm_password'
              {...register('confirm_password', {
                required: '비밀번호를 다시 입력해주세요.',
                validate: (value) =>
                  value === watch('password') || '비밀번호가 일치하지 않습니다'
              })}
            />
            {errors.confirm_password && <p>{errors.confirm_password.message}</p>}
            <span className='mypage_confirmEdit'>
              <button type='submit'>수정완료</button>
              <button onClick={delectUser}>회원탈퇴</button>
            </span>

          </div>
          </form>
        : <div className='mypage_profile'>
          <div className='mypage_profile1'>
            <div className='mypage_myimg'>
              <Avatar
                alt='Remy Sharp'
                src={userinfo.image_url}
                sx={{ width: 116, height: 116 }}
              />
            </div>
          </div>
          <div className='mypage_profile2'>
            <div className='mypage_nickname'>{userinfo.nickname}</div>
            <div className='mypage_email'>{userinfo.email}</div>
            <button className='mypage_editbutton' onClick={editHandle}>프로필수정</button>
          </div>
          </div>}

      <div className='mypage_mypost'>

        {posts.length === 0
          ? <div className='mypage_nothing'>
            게시글이 없습니다.
            </div>
          : posts.map((post) => <PostListCard post={post} key={post.id} />)}
      </div>
    </div>
  )
}

export default MyPage
