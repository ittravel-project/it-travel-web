import http from './BaseService'

const deleteComment = id => http.delete(`/comments/${id}`)
const createComment = comment => http.post('/comments', comment)



export default {deleteComment, createComment}

