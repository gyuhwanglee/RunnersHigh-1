require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CORS_URL,
    methods: ['GET', 'POST']
  }
})
const cookieParser = require('cookie-parser')
const PORT = 80
const userRoute = require('./route/user')
const postRoute = require('./route/post')
const chatRoute = require('./route/chat')
app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: [process.env.CORS_URL],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  })
)

io.on('connection', (socket) => {
  console.log('연결성공')

  socket.on('message', (info) => {
    console.log(info)
    io.to(`${info.roomId}`).emit('message', info)
  })
  socket.on('joinRoom', ({ roomId: id }) => {
    socket.join(`${id}`)
    io.to(`${id}`).emit('joinRoom', `${id}번방으로 입장했습니다`)
  })

  socket.on('disconnect', () => {
    console.log('연결해제')
  })

  // socket.on('leaveRoom', ({ roomId: id }) => {
  //   socket.leave(id)
  //   io.to(id).emit('leaveRoom', `${id}번방에서 퇴장했습니다`)
  // })
})

app.get('/', (req, res) => {
  res.send('Hello RunnersHigh!')
})

app.use('/users', userRoute)
app.use('/posts', postRoute)
app.use('/chat', chatRoute)

server.listen(PORT, () => {
  console.log(`이 서버는 ${PORT}에서 실행중입니다.`)
})
