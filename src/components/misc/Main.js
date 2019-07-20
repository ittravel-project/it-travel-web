import React from 'react';
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Main = () => {
    return (
        <div className='main'>
            <Carousel.Caption>
              <h1 className="app-name">S'cape<i className="fa fa-paper-plane"></i></h1>
            </Carousel.Caption>

            <Carousel indicators={false} fade={true}>
              <Carousel.Item>
                <img
                  className="d-block slider-img"
                  src="https://images.unsplash.com/photo-1506976773555-b3da30a63b57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80https://images.unsplash.com/photo-1551899892-56314e56f2c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=612&q=80"
                  alt="First slide"
                />
                
                <Carousel.Caption className="slider-text">
                  <h3>A Traveler's Guide</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block slider-img"
                  src="https://images.unsplash.com/photo-1530569112985-108dc2578ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
                  alt="Second slide"
                />

                <Carousel.Caption className="slider-text">
                  <h3>For Travelers</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block slider-img"
                  src="https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                  alt="Third slide"
                />

                <Carousel.Caption className="slider-text">
                  <h3>By Travelers</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <Carousel.Caption className="main-buttons">
                <Link className="login-btn" to='/login'>Log in</Link>

                <Link className="signup-btn" to='/register'>Sign up</Link>
            </Carousel.Caption>

        </div> 
    )
}

export default Main 