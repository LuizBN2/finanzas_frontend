import React from "react";
import { Logout } from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { Col, Container, Row, Spinner, Button } from "reactstrap";
import imgLogo from './Images/logo3.png';
import './App.css';

export const Banner = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        <>
        {isLoading ? (
            <Spinner className="loading-spinner" />
        ):(
            isAuthenticated && (
                <Container className="custom-container" >
                    <Row>
                        <Col md={4} className="centered-col">
                        <img src={imgLogo} alt="" width={200}/> 
                        </Col>
                        <Col md={8} className="centered-col">
                        <h1  style={{color: "#956B2E"}}>&middot; Finanzas Personales &middot;</h1>
                        <h4  style={{color: "#BFA181"}}>Control de Ingresos, Gastos y Deudas</h4>
                        <hr className="custom-hr w-100"/>
                        <p className="user-info">
                            {user.name}{" "}<Logout/>                            
                        </p>
                        </Col>
                    </Row>
                </Container>
        ))}
        </>
    ) 
    
}