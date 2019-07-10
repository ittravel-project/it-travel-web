import React from 'react'
import PostService from '../../services/PostService'
import Profile from './Profile';

class ProfileList extends React.Component {
 state = {
    c: []
 }

 fetchProfiles = () => {
    ProfileService.getProfiles().then(
     response => {
       this.setState({ profiles: response.data })
     }
   )
 }

 componentDidMount() {
   this.fetchProfiles()
 }


 render () {
   return (
     <div className="ProfileList">
       {this.state.profiles.map((profile, i) => (
         <Profile profile={profile} key={i} />
       ))}
     </div>
   )
 }
}

export default ProfileList