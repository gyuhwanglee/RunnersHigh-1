import '../stylesheet/signup.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

function Signup ({ ChangeSelect }) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm({ mode: 'onChange' })

  const dispatch = useDispatch()
  // const checkPassword = () => {
  //   const reg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
  // }
  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
      email: data.email,
      password: data.password,
      nickname: data.nickname
    }, {
      'Content-Type': 'application/json'
    })
      .then((res) => {
        ChangeSelect()
        alert('회원가입이 되었습니다.')
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert('이미 존재하는 이메일 입니다.')
        }
      })
  }

  return (
    <div className='signup_container'>
      <h3 className='signup_title'>
        Signup
      </h3>
      <Box className='signup_form' component='form' sx={{ mt: 1 }} maxWidth onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '잘못된 이메일 형식입니다.'
              }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='nickname'
            label='Nickname'
            name='nickname'
            {...register('nickname', {
              required: '닉네임을 입력해주세요.',
              maxLength: {
                value: 10,
                message: '10자 미만으로 설정해주세요.'
              }
            })}
          />
          {errors.nickname && <p>{errors.nickname.message}</p>}
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
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/,
                message: '비밀번호는 영문포함 최소 8자 이상 입니다.'
              }
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
      <div onClick={ChangeSelect} className='signup_tologin'>아이디가 있으십니까?</div>
    </div>
  )
}

export default withRouter(Signup)
