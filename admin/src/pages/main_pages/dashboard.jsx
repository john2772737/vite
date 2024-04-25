
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './dashboard.css'; // Import your CSS file

function Dashboard() {
  return (
    <div className='overview'>
      <h1>Overview</h1>
      <Container fluid className="outer-container">
        {/* Outer container */}
        <Row xs={1} md={2} lg={2}>
          {/* Set the number of columns for different screen sizes */}
          <Col>
            <Container className="inner-container">
              {/* First inner container */}
              <div className="box-container">
                <h2>Total Income</h2>
              </div>
            </Container>
          </Col>
          <Col>
            <Container className="inner-container">
              {/* Second inner container */}
              <div className="box-container">
                <h2>Total Sales</h2>
              </div>
            </Container>
          </Col>
          <Col>
            <Container className="inner-container">
              {/* Third inner container */}
              <div className="box-container">
                <h2>Total Seller</h2>
              </div>
            </Container>
          </Col>
          <Col>
            <Container className="inner-container">
              {/* Fourth inner container */}
              <div className="box-container">
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
