import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
Box

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  if (!blog) {
    return <div>Loading...</div>
  }

  const showRemoveButton = blog.user?.username === user?.username

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 2,
        borderRadius: 3,
        boxShadow: 3,
        transition: '0.2s',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          {blog.title}
        </Typography>

        <CardActions sx={{ px: 0 }}>
          <Button size="small" href={blog.url} target="_blank">
            Read Blog
          </Button>
        </CardActions>

        <Divider sx={{ my: 2 }} />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="body2">👍 {blog.likes} likes</Typography>

          {user && (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleLike(blog)}
            >
              Like
            </Button>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Added by {blog.user?.name}
        </Typography>

        {showRemoveButton && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(blog)}
          >
            Delete
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default Blog
