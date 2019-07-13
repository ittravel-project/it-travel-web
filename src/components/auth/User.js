import React from 'react'


const User = ({ user }) => {

  return (
    <div>
    <div className="card" style={{ maxWidth: 400, maxHeight: 400}}>
      <img className="card-img-top" src={user.avatar ? URL.createObjectURL(user.avatar) : user.avatarURL}  alt="Card image cap" style={{ maxWidth: 100, maxHeight: 100}} />
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.city}</p>
        <p className="card-text">{user.description}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  );
}


export default User