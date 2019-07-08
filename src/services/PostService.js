import http from './BaseService'

const getPosts = () => http.get('/posts')
const deletePost = id => http.delete(`/posts/${id}`)
const createPost = post => http.post('/posts', post)



export default {getPosts, deletePost, createPost}

