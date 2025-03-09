import logo from './logo.svg';
import './App.css';
import { LoginPage } from './Login';
import { useAuth0 } from '@auth0/auth0-react';
import { Col, Container, Row } from 'reactstrap';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <header> 
        { isAuthenticated ? (
          <>
          <Container>
            <Row className='mt-5'>
              <Col md={6}>
              <LoginPage/>
              </Col>
            </Row>
          </Container>          
          </>
        ):(
          <LoginPage/>
        )}    
      </header>
    </div>
  );
}

export default App;
