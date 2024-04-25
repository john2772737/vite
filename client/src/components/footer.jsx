import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../css/footer.css";
import Logo from "../images/booklot_logo.png";

export default function App() {
  return (
    <MDBFooter
      id="footer"
      className="custom-footer text-center text-lg-start text-muted"
    >
      <section className="secret">
        <MDBContainer className="text-center text-md-start mt-5  border-bottom">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <img src={Logo} alt="booklot" className="booklot_logo" />
              <h6 className="text-uppercase fw-bold mb-4">BOOKLOT</h6>
              <p>
                Connect with us for inquiries, support, and updates on our
                latest offerings. Explore our diverse selection of books and
                immerse yourself in a world of reading adventures. Join our
                community and stay informed on exclusive promotions, events, and
                more!
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Customer Service</h6>
              <p>
                <a href="#!" className="text-reset">
                  HELP CENTER
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  PAYMENT METHODS
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  ORDER TRACKING
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  FREE SHIPPING
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  RETURN & REFUND
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  CONTACT US
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  SUBMIT REPORT
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">PAYMENT</h6>
              <p>
                <a href="#!" className="text-reset">
                  <MDBIcon color="white" fab icon="paypal" />
                  PAYPAL
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  <MDBIcon color="white" fas icon="money-bill" />
                  CASH ON DELIVERY
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
              <p>
                <MDBIcon color="white" icon="home" className="me-2" />
                Pampanga, Philippines
              </p>
              <p>
                <MDBIcon color="white" icon="envelope" className="me-3" />
                booklot@gmail.com
              </p>
              <p>
                <MDBIcon color="white" fab icon="facebook" className="me-3" />
                booklot_ph
              </p>
              <p>
                <MDBIcon color="white" fab icon="instagram" className="me-3" />
                booklot_ph
              </p>
              <p>
                <MDBIcon color="white" fab icon="twitter" className="me-3" />
                booklot_ph
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <section className="d-flex flex-column align-items-center justify-content-center footer-section">
        <div className="follow">
          <h6 className="text-uppercase fw-bold mb-4">Follow Us</h6>
        </div>
        <div className="d-flex align-items-center">
          <a href="" className="me-4 text-reset">
            <MDBIcon color="white" fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="white" fab icon="twitter" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="white" fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="white" fab icon="instagram" />
          </a>
        </div>

        <div className="copyright">
          <div className="text-center footer-copyright">
            © 2024 Copyright:
            <a className="text-reset fw-bold" href="#">
              Booklot
            </a>
          </div>
        </div>
      </section>
    </MDBFooter>
  );
}
