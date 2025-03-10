import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Input, Spinner } from "reactstrap";
import './App.css';
import moment from 'moment';  // Importamos moment.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faEdit, faForward, faRectangleXmark, faSquare, faSquareCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

export const IngresosList = () => {
    const [ingresos, setIngresos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingIngreso, setEditingIngreso] = useState(null);
    const [newIngresoDescripcion, setNewIngresoDescripcion ] = useState('');
    const [newIngresoFecha, setNewIngresoFecha ] = useState('');
    const [newIngresoMonto, setNewIngresoMonto] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ingresoPerPage = 3;
    const apiUrlIngresos = "https://spring-back-app-latest.onrender.com/ingresos"

    //Mostrar los ingresos
    useEffect(() => {
        const fetchIngresos = async () => {
            try {
                const response = await axios.get(apiUrlIngresos);
                console.log("Respuesta completa de la API:", response.data);
                const ingresosConFechasFormateadas = response.data.map(ingreso => {
                    console.log("Ingreso completo:", ingreso);
                    return {
                        ...ingreso,
                        fechaIngreso: moment(ingreso.fechaIngreso).format("YYYY-MM-DD"),  // Formateamos la fecha con moment
                        monto: ingreso.monto.toLocaleString(),  // Formatear monto con puntos de mil
                    };
                });
                setIngresos(ingresosConFechasFormateadas);
            } catch (err){
                setError('Error al cargar los ingresos.');
            } finally{
                setLoading(false);
            }
        };
        fetchIngresos();
    }, []);

    //Eliminar los ingresos
    const deleteIngreso = async (id) => {
        try {
            await axios.delete(`${apiUrlIngresos}/${id}`);
        } catch (err){
            setError("No se pudo eliminar el ingreso.")
        }
    };

    //Componentes para editar los ingresos
    const editIngreso = (ingreso) => {
        setEditingIngreso(ingreso);
        setNewIngresoDescripcion(ingreso.descripcion);
        setNewIngresoFecha(ingreso.fechaIngreso); //La fecha ya está en el formato adecuado
        setNewIngresoMonto(ingreso.monto);  // Asignamos el monto numérico sin formato
    };

    const saveIngreso = async () => {
        try {
            // Primero, validamos el monto
            const parsedMonto = parseFloat(newIngresoMonto.replace(/\./g, ''));
            if (isNaN(parsedMonto)) {
                setError('El monto ingresado no es válido.');
                return; // Salimos de la función si el monto no es válido
            }
            const updateIngreso = { 
                ...editingIngreso, 
                descripcion: newIngresoDescripcion,
                fechaIngreso: moment(newIngresoFecha).format("YYYY-MM-DD"), // Aseguramos que la fecha esté en el formato adecuado
                monto: parsedMonto //Usamos el monto válido
                //revisar esta otra opción: monto: parseInt(newIngresoMonto)  // Guardamos el monto como un número entero (sin puntos)
            };
            await axios.put(`${apiUrlIngresos}/${editingIngreso.id}`, updateIngreso);
            //Actualizamos la lista de ingresos
            setIngresos(ingresos.map(ingreso => (ingreso.id === editingIngreso.id ? updateIngreso: ingreso)));
            //Limpiamos los campos después de guardar
            setEditingIngreso(null);
            setNewIngresoDescripcion('');
            setNewIngresoFecha('');
            setNewIngresoMonto(0);
        } catch (err){
            setError("No se pudo actualizar el ingreso")
        }
    };
    const cancelEdit = () => {
        setEditingIngreso(null);
        setNewIngresoDescripcion('');
        setNewIngresoFecha('');
        setNewIngresoMonto(0);
    };

    

    //componentes para paginar
    const indexOfLastIngreso = currentPage * ingresoPerPage;
    const indexOfFirstIngreso = indexOfLastIngreso - ingresoPerPage;
    const currentIngresos = ingresos.slice(indexOfFirstIngreso, indexOfLastIngreso);
    const totalPages = Math.ceil(ingresos.length / ingresoPerPage);

    //Diseño HTML
    return (
        <>        
        <div className="list-container">
            <h5 className="text-info">Ingresos</h5>
            {loading && (
                <div className="text-center">
                    <Spinner className="loading-spinner"/>
                </div>
            )}
            {!loading && error && (
                <Alert className="custom-alert">{error}</Alert>
            )}
            {!loading && !error && (
                <>
                {currentIngresos.map(ingreso => (
                    <div className="custom-max-width" key={ingreso.id}>
                        <div className="custom-max-width">
                            <div>
                                <div>
                                    {editingIngreso && editingIngreso.id === ingreso.id ? (
                                        <Input 
                                        type="text" 
                                        value={newIngresoDescripcion}
                                        onChange={(e) => setNewIngresoDescripcion(e.target.value)}
                                        className="custom-edit"
                                        />  
                                    ):(
                                        <div className="custom-input">                            
                                        {ingreso.descripcion && ingreso.descripcion.toLocaleString()}
                                        </div>
                                    )}
                                </div>
                            </div>                        
                        </div>
                        <div className="custom-max-width">
                            <div>
                                <div>
                                    {editingIngreso && editingIngreso.id === ingreso.id ? (
                                        <Input 
                                        type="date" 
                                        value={newIngresoFecha}  // La fecha ya está formateada y lista
                                        onChange={(e) => setNewIngresoFecha(e.target.value)}
                                        className="custom-edit"
                                        />  
                                    ):(
                                        <div className="custom-input">                            
                                        {ingreso.fechaIngreso && ingreso.fechaIngreso.toLocaleString()}
                                        </div>
                                    )}
                                </div>
                            </div>                        
                        </div>
                        <div className="custom-max-width">
                            <div>
                                <div >
                                    {editingIngreso && editingIngreso.id === ingreso.id ? (
                                        <Input 
                                        type="text" 
                                        value={newIngresoMonto}
                                        onChange={(e) => {
                                            // Al editar, eliminamos los puntos visuales
                                            setNewIngresoMonto(e.target.value.replace(/\D/g, '')) // Permitimos solo números
                                        }}
                                        className='custom-edit'
                                        />  
                                    ):(
                                        <div className="custom-input">
                                        {ingreso.monto && ingreso.monto.toLocaleString()}   
                                        </div>                                      
                                    )                                    
                                    }
                                    
                                </div>
                            </div>                        
                        </div>                        
                        {editingIngreso && editingIngreso.id === ingreso.id ? (
                            <div>
                                <FontAwesomeIcon 
                                icon={faRectangleXmark}
                                onClick={cancelEdit}
                                className="icon-cancel"
                                />                                
                                <FontAwesomeIcon 
                                icon={faSquareCheck}
                                onClick={saveIngreso}
                                className="icon-ok"
                                />

                            </div>
                        ) :(
                            //Botones
                            <div className="text small mb-1">
                            <FontAwesomeIcon 
                            icon={faEdit} 
                            className="icon-edit"
                            onClick={() => editIngreso(ingreso)}
                            />{' '}
                            <FontAwesomeIcon 
                            icon={faTrash} 
                            className="icon-del"
                            onClick={() => deleteIngreso(ingreso.id)}
                            />
                            </div>
                        )}                         
                    </div> 
                ))}
                <div className='custom-page'>
                    <FontAwesomeIcon 
                    icon={faBackward}
                    className={currentPage === 1 ? 'disabled' : ''} 
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}                            
                    />                    
                    <span className="custom-span">Página { currentPage } de { totalPages }</span>
                    <FontAwesomeIcon 
                    icon={faForward} 
                    className={currentPage === totalPages ? 'disabled' : ''}
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}                            
                    />   
                </div>
                </>
            )}
        </div>        
        </>
    );
}