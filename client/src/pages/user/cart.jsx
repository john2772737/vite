import React, { useState } from "react";
// import {
//   MDBNavbar,
//   MDBContainer,
//   MDBIcon,
//   MDBNavbarNav,
//   MDBNavbarItem,
//   MDBNavbarLink,
//   MDBNavbarToggler,
//   MDBCollapse
// } from "mdb-react-ui-kit";

export default function App() {
  const [openNavCentred, setOpenNavCentred] = useState(false);

  return (
    <div className="mycart">
      {/* <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarCenteredExample"
            aria-controls="navbarCenteredExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenNavCentred(!openNavCentred)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse
            navbar
            open={openNavCentred}
            className="justify-content-center"
            id="navbarCenteredExample"
          >
            <MDBNavbarNav fullWidth={false} className="mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink href="#" tabIndex={-1} aria-disabled="true">
                  TO PAY
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#" tabIndex={-1} aria-disabled="true">
                  TO SHIP
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#" tabIndex={-1} aria-disabled="true">
                  TO RECEIVE
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#" tabIndex={-1} aria-disabled="true">
                  TO RATE
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar> */}
      <h1>MY CART</h1>
      <p>dito laman ng products</p>
      <p>total: </p>
      <button className="checkout">Checkout</button>
    </div>
  );
}