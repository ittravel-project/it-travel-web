import React, { Fragment } from 'react';
//import { Redirect } from 'react-router-dom';
//import authService from '../../services/AuthService';
//import {withAuthConsumer} from '../../contexts/AuthStore'
import NavBar from '../misc/NavBar'
import SearchBar from '../misc/SearchBar'
import queryString from 'query-string'

class Home extends React.Component {

    render() {
        return(
            <Fragment>
                <div className='Home-image'>
                    <img src='https://img.jakpost.net/c/2018/01/11/2018_01_11_38768_1515668901._large.jpg' width='420px' height='200px'/>
                </div>
                <div className="d-flex justify-content-around">
                    <button className="btn-success col-4 p-2"></button>
                    <button className="btn-success col-4 p-2"></button>
                </div>
                <SearchBar queryString={queryString} />
                <div className='row'> 
                    <div className='p-4 bg-light border-right rounded'>
                        <div className='row'>
                        <div className="card">
                            <img className="card-img-top" src="..." alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card">
                                <img className="card-img-top" src="..." alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
                <NavBar /> 
        </Fragment>
        )
    }
}

export default Home 