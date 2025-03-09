import axios from "axios";
import React, { useEffect, useState } from "react";

export const IngresosList = () => {
    const [ingresos, setIngresos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingIngreso, setEditingIngreso] = useState(null);
    const [newIngresoDescripcion, setNewIngresoDescripcion ] = useState('');
    const [newIngresoFecha, setNewIngresoFecha ] = useState(Date.now());
    const [newIngresoMonto, setNewIngresoMonto] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ingresoPerPage = 5;
    const apiUrlIngresos = "https://spring-back-app-latest.onrender.com/ingresos"

    //Mostrar los ingresos
    useEffect(() => {
        const fetchIngresos = async () => {
            try {
                const response = await axios.get(apiUrlIngresos);
                setIngresos(response.data);
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
        setNewIngresoFecha(ingreso.fecha_ingreso);
        setNewIngresoMonto(ingreso.monto);
    };

    const saveIngreso = async () => {
        try {
            const updateIngreso = { 
                ...editingIngreso, 
                descripcion: newIngresoDescripcion,
                fecha_ingreso: newIngresoFecha,
                monto: newIngresoMonto};
            await axios.put(`${apiUrlIngresos}/${editingIngreso.id}`, updateIngreso);
            setIngresos(ingresos.map(ingreso => (ingreso.id === editingIngreso.id ? updateIngreso: ingreso)));
            setEditingIngreso(null);
            setNewIngresoDescripcion('');
            setNewIngresoFecha(Date.now());
            setNewIngresoMonto(0);
        } catch (err){
            setError("No se pudo actualizar el ingreso")
        }
    };
    const cancelEdit = () => {
        setEditingIngreso(null);
        setNewIngresoDescripcion('');
        setNewIngresoFecha(Date.now());
        setNewIngresoMonto(0);
    };

    //componentes para paginar
    const indexOfLastIngreso = currentPage * ingresoPerPage;
    const indexOfFirstIngreso = indexOfLastIngreso - ingresoPerPage;
    const currentIngresos = ingresos.slice(indexOfFirstIngreso, indexOfLastIngreso);
    const totalPages = Math.ceil(ingresos.length / ingresoPerPage);

}