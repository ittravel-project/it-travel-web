import http from './BaseService'

// const getComments = (postId) => http.get(`/posts/${postId}/comments`)
const deleteComment = id => http.delete(`/posts/:postId/comments/${id}`)
const createComment = (postId, comment) => http.post(`/posts/${postId}/comments`, comment)
const getCommentByPost = (postId) => http.get(`/posts/${postId}/comments`)



export default {  deleteComment, createComment , getCommentByPost}

