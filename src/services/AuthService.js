import http from './BaseService';

const register = (user) => http.post('/register', user)
 .then(res => Promise.resolve(res.data));

const authenticate = (user) => http.post('/login', user)
 .then(res => Promise.resolve(res.data));

const getProfile = () => http.get('/profile')
 .then(res => Promise.resolve(res.data));

 const getUserList = () => http.get('/profilelist')

const updateProfile = (user) => {
    const data = new FormData();
    Object.keys(user).forEach(prop =>{
        if(prop=== 'password' && user.password==='') return;
        data.append(prop,user[prop])
    });
    return http.put('/profile', data)
    .then(res => Promise.resolve(res.data));
}

const logout = () => {
    return http.get('/logout')
    .then(res => Promise.resolve(res.data))
}


export default {register, authenticate, getProfile, getUserList, updateProfile, logout}