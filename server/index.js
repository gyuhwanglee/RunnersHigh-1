const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = 80
const userRoute = require('./route/user')
const postRoute = require('./route/post')
app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  })
)

app.get('/', (req, res) => {
  res.send('hello RunnersHigh')
})

app.use('/users', userRoute)
app.use('/posts', postRoute)

app.listen(PORT, () => {
  console.log(`이 서버는 ${PORT}에서 실행중입니다.`)
})
