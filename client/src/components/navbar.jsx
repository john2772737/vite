import React from 'react'
import { Navbar, Container } from 'react-bootstrap'; 

function navbar(props) {

    const { brand } = props; 
  return (
    <div>
       <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      <Navbar.Brand href="#">{brand}</Navbar.Brand>
      </Container>
      </Navbar>
    </div>
  )
}

export default navbar
