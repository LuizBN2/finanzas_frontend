import logo from './logo.svg';
import './App.css';
import { LoginPage } from './Login';
import { useAuth0 } from '@auth0/auth0-react';
import { Col, Container, Row } from 'reactstrap';
import { Banner } from './Banner';

function App() {
  const { isAuthenticated } = useAuth0();
  return (  
    <>         
        { isAuthenticated ? (
          <div className="app-container">
          <header className='full-width-header'> 
          <Banner/>
          </header>
          <Container>
            <Row className='mt-5'>
              <Col md={6}>              
              </Col>
            </Row>
          </Container>          
          </div>
        ):(
          <div>
          <LoginPage/>
          </div>          
        )}
    </> )  
       
  
}

export default App;
