import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './App.css';
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import imgBanner from './Images/task.jpg';
import imgLogo from './Images/logo3.png';

export const LoginPage = () =>{
    const { loginWithRedirect, isLoading, error } = useAuth0();
    return (
        <div className="app-container" style={{backgroundColor: "#0A1828"}}>
            <Container fluid className="d-flex justify-content-center align-items-center full-height">
                <Row className="justify-content-center w-100">
                    <Col className="centered-col">
                    <img src={imgLogo} alt="" width={200}/>
                    <h1 className="title" style={{color: "#BFA181"}}>Finanzas Personales</h1>
                    <hr className="custom-hr"/>
                    {/*Muestra la imagen del banner */}
                    <img
                    src={imgBanner}
                    alt="Imagen de Bienvenida"
                    className="img-fluid mb-4 banner-img"
                    width={550}
                    />
                    <hr className="custom-hr"/>
                    {/**Mostrar spinner mientras está cargando */}
                    { isLoading ? (
                        <Spinner className="loading-spinner" />
                   ):(
                        <Button className="btn-login" style={{backgroundColor: "#178582", border:"none"}} onClick={() => loginWithRedirect()} >
                            Iniciar Sesión
                        </Button>                      
                    )}
                    {/**Mostrar mensaje de error, si ocurre */}
                    {error && <h5 className="error-message">{error.message}</h5>}
                    </Col>
                </Row>
            </Container>
        </div>
    )

}