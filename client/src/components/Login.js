import '../stylesheet/login.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { setUserinfo, setIsLogin } from '../redux/action'
import { withRouter } from 'react-router-dom'

window.Kakao.init(process.env.REACT_APP_KAKAO_LOGIN)

const Login = ({ ChangeSelect, OpenModal, isLogin }) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({ mode: 'onChange' })

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
      email: data.email,
      password: data.password
    }, {
      'Content-Type': 'application/json'
    })
      .then((data) => {
        localStorage.setItem('accessToken', data.data.data.accessToken)
        //  console.log(data)
        dispatch(setIsLogin(true))

        axios.get(`${process.env.REACT_APP_API_URL}/users/userinfo`, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`
          }
        })
          .then((data) => {
            dispatch(setUserinfo(data.data.data))
          })
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert('로그인 정보가 일치하지 않습니다.')
        }
      })
  }

  const kakakoLogin = async () => {
    await window.Kakao.Auth.login({
      scope: 'profile_nickname, profile_image, account_email',
      success: (authObj) => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: res => {
            const kakaoAccount = res.kakao_account
            axios.post(`${process.env.REACT_APP_API_URL}/users/login/kakao`, {
              email: kakaoAccount.email,
              nickname: kakaoAccount.profile.nickname,
              thumbnail_url: kakaoAccount.profile.thumbnail_image_url
            }, {
              withCredentials: true
            })
              .then((data) => {
                localStorage.setItem('accessToken', data.data.data.accessToken)
                dispatch(setIsLogin(true))
                axios.get(`${process.env.REACT_APP_API_URL}/users/userinfo`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.accessToken}`
                  }
                })
                  .then((data) => {
                    dispatch(setUserinfo(data.data.data))
                  })
              })
          }
        })
      }
    })

    dispatch(setIsLogin(true))
  }
  return (
    <div className='login_container'>
      <h3 className='login_title'>
        Login
      </h3>
      <Box className='login_form' component='form' sx={{ mt: 1 }} maxWidth onSubmit={handleSubmit(onSubmit)}>

        <Grid item xs={12}>
          <TextField
            margin='normal'
            required
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            {...register('email', {
              required: '이메일을 입력해주세요.'
              // pattern: {
              //   value:
              //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              //   message: '잘못된 이메일 형식입니다.'
              // }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상입니다.'
              }
            })}
          />
        </Grid>
        {errors.password && <p>{errors.password.message}</p>}
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={isLogin
            ? OpenModal(false)
            : null}
        >
          Sign In
        </Button>
      </Box>
      <div className='login_social' onClick={kakakoLogin}>
        <div />
      </div>

      <div onClick={ChangeSelect} className='login_tosignup'>회원이 아니십니까?</div>
    </div>
  )
}

export default withRouter(Login)
