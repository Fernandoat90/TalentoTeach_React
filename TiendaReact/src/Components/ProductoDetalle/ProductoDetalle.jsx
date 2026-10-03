import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import{Link} from "react-router-dom";
import {supabase} from "../../supabaseClient"
import styles from "./ProductoDetalle.module.css"

const ProductoDetalle = ()=>{
    const {id} = useParams();
    const [producto,setProducto]=useState(null);
    const [error,setError]=useState(null)

    useEffect(()=>{
        
        const prodDetalle= async ()=>{
            try{
                const { data ,error }=await supabase
                    .from("prod_react")
                    .select("*")
                    .eq("id",id)
                    .single()
                
                if(error){
                    setError(error.message)
                    return;
                }

                setProducto({
                    id:data.id,
                    nombre:data.nombre,
                    precio:data.precio,
                    urlImagen:data.url_imagen,
                    detalle:data.detalle
                })


            }catch{
                setError(error.message);
            }
        }
        prodDetalle()
    },[id]);


if(!producto){
    return <h2>"Cargando Detalle del producto ..."</h2>
}

if(!producto.id){
    return<h2>Producto no encontrado</h2>
}

return(
    <div className={styles.div}>
        <h2><ins>Detalle del producto</ins></h2>
        <br/>
        <h3>{producto.nombre}</h3>
        <img src={producto.urlImagen} alt={producto.nombre} className={styles.img} />

        <h3>${producto.precio}</h3>

        <p><ins>Caracteristicas del Producto</ins>
            <br/>
            {producto.detalle}
        </p>
        <Link to="/productos">
            <button>Volver a Productos</button>
        </Link>
    </div>
    
);
};

export default ProductoDetalle;
