import http from './BaseService';

const register = (user) => http.post('/register', user)
 .then(res => Promise.resolve(res.data));

const authenticate = (user) => http.post('/login', user)
 .then(res => Promise.resolve(res.data));

 const getProfile = (user) => http.post('/profile', user)
 .then(res => Promise.resolve(res.data));

 const updateProfile = (user) => {
     const data = new FormData();
     Object.keys(user).forEach(prop =>{
         if(prop=== 'password' && user.password==='') return;
         data.append(prop,user[prop])
     });
     return http.post('/profile', data)
     .then(res => Promise.resolve(res.data));
 }




export default {
 register,
 authenticate,
 getProfile,
 updateProfile

}