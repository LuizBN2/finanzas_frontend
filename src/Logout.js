import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "reactstrap";
import './App.css';


export const Logout = () => {
    const { logout } = useAuth0();
    return (
        <>
        <Button className="btn-logout"  onClick={()=>{
            logout({
                logoutParams: { returnTo: window.location.origin }
            });
            localStorage.clear();
            sessionStorage.clear();
            }}
            >
            Cerrar Sesión
        </Button>
        </>
    )
}