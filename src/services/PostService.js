import http from './BaseService'

const getPosts = (params) => http.get(`/posts`, { params: params || {} })
const deletePost = id => http.delete(`/posts/${id}`)
const createPost = post => http.post('/posts', post)
const getPostDetail = id => http.get(`/posts/${id}/comments`)



export default {getPosts, deletePost, createPost, getPostDetail}

