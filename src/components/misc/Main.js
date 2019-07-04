import React from 'react';
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Main = () => {
    return (
        <div className='main'>
            <h1>ItTravel</h1>

            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="http://lorempixel.com/300/300/nature/2/"
                  alt="First slide"
                />
                
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="http://lorempixel.com/300/300/nature/3"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="http://lorempixel.com/300/300/nature/4"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            
            <Link className="btn btn-primary" to='/login'>Log in</Link>
            <Link className="btn btn-danger" to='/register'>Create Account</Link>
        </div> 
    )
}

export default Main 