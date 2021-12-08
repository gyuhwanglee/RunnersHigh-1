import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setPost } from '../redux/action/index'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

export default function PostListCard ({ post }) {
  const [expanded, setExpanded] = React.useState(false)

  const date = post.createdAt.slice(0, 10)

  // console.log(new Date());
  // console.log('234234234',date.slice(0,10))
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const aboutDetailPost = () => {
    dispatch(setPost(post))
    history.push('/detailpost')
  }

  return (

    <div className='postcard_container'>
      <Card sx={{ minWidth: 500, maxWidth: 500 }}>
        <div onClick={aboutDetailPost}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500], width: 60, height: 60 }} aria-label='your image' src={post.user.image_url} />

        }
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
        }
            title={post.user.nickname}
            subheader={date}
          />
        </div>
        <div onClick={aboutDetailPost}>
          <CardMedia
            component='img'
            height='194'
            image={post.thumbnail_url}
            alt='Your image'
          />
        </div>
        <CardContent>
          <Typography variant='body2 h1' color='text.secondary' style={{ fontWeight: 900, fontSize: 20 }}>
            {post.title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            {/* <FavoriteIcon /> */}

          </IconButton>
          <div>만남장소 : {post.location}</div>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>{post.text}</Typography>

          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}
