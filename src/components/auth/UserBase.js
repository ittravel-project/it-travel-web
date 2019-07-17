import React from 'react'
import AuthService from '../../services/AuthService'
import NavBar from '../misc/NavBar';
import UserTwo from './UserTwo'


class UserBase extends React.Component{
    constructor(props){
        super(props);

        this.state={
            user: []
        };

    }
       
    fetchUser = () => {
        AuthService.getProfileByUser(this.props.match.params.userId).then(
            response => {
            this.setState({ user: response.data })
            }
        )
    }
    
    componentDidMount() {
        this.fetchUser()
    }


    render(){
        return(
            <div >
                <NavBar />
            </div>
        )
    }
}

export default UserBase