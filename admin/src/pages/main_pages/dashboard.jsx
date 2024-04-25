
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './dashboard.css'; // Import your CSS file

function Dashboard() {
  return (
    <div className='overview' >
      <h1>Overview</h1>
      <Container>
        {/* Outer container */}
        <Row xs={1} md={2} lg={2}>
          {/* Set the number of columns for different screen sizes */}
          <Col>
            <Container className="inner-container1">
              {/* First inner container */}
              <div className="box-container1">
                <h2>Total Income</h2>
              </div>
            </Container>
          </Col>
          <Col>
            <Container className="inner-container2">
              {/* Second inner container */}
              <div className="box-container2">
                <h2>Total Sales</h2>
              </div>
            </Container>
          </Col>
          <Col>
            <Container className="inner-container3">
              {/* Third inner container */}
              <div className="box-container3">
                <h2>Total Seller</h2>
              </div>
            </Container>
          </Col>
          <Col>
            <Container className="inner-container4">
              {/* Fourth inner container */}
              <div className="box-container4">
                <h2>Total number of User</h2>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
