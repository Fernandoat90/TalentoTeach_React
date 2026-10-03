import { useEffect, useState } from "react";
import { ItemList } from "./ItemList.jsx";
import styles from './ItemList.module.css';
import {supabase} from "../../supabaseClient.js"

export function ItemListContainer({Mensaje}){

    const [productos,setProductos]=useState([]);
    const [error,setError]=useState(null);
    const [cargando,setCargando]=useState(true);

    useEffect(()=>{
            
        const cargarProductos= async ()=>{
            try{
                const {data,error}=await supabase
                    .from("prod_react")
                    .select("*")
                    .order("id",{ascending:true})

                if(error){
                    setError(error.message)
                    return;
                }

                const productosFormateados=data.map(producto=>({
                    id:producto.id,
                    nombre:producto.nombre,
                    precio:producto.precio,
                    urlImagen:producto.url_imagen,
                    detalle:producto.detalle
                }))

                setProductos(productosFormateados);
            } catch (error){
                setError(error.message)
            } finally {
                setCargando(false)
            }
                
            };

            cargarProductos();

        },[]);


        if(cargando) {
        
        return (
                <div className={styles.cargando}>
                    <div className={styles.spinner}></div>
                        <p>Cargando productos, por favor espere...</p>
                </div>
                );
        }
        if (error) {
        return <p>Error: {error}</p>;
        }

        if(productos.length===0){
            return(
        <div className={styles.prod}>
            <h2>{Mensaje}</h2>
            <div>
                <p>No hay productos cargados</p>
            </div>
        </div>
    );
        }
    
    return(
        <div className={styles.prodCarg}>
            <h2>{Mensaje}</h2>
            <div>
                <ItemList productos={productos} />
            </div>
        </div>
    );
}