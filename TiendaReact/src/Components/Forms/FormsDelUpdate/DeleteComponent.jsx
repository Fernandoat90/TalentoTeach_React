import { useState,useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import styles from "./DeletProd.module.css";

export function DeleteProduct(){
    const location=useLocation();
    const navigate=useNavigate();

    const id=location.state?.id;

    const [producto,setProducto]=useState(null);
    const [cargando ,setCargando]=useState(true);
    const [eliminando,setEliminando]=useState(false);
    const [error,setError]=useState("");

    useEffect(()=>{
        const buscarProd = async ()=>{
            try{
                const {data,error}=await supabase
                    .from("prod_react")
                    .select("*")
                    .eq("id",id)
                    .single();

                    if(error) throw error;

                    if(!data){
                        setError("El podructo solicitado no existe en la base de datos");
                        return;
                    }

                    setProducto({
                        id:data.id,
                        nombre:data.nombre,
                        precio: data.precio,
                        urlImagen: data.url_imagen,
                        detalle: data.detalle
                    })
            }catch (error) {
                console.error("Error al buscar producto:", error);
                setError("No se pudo cargar el producto.");
            } finally {
                setCargando(false);
            }
        };
            buscarProd();
    }, [id]);
    
    const eliminarProd = async ()=>{

        if(!producto) return;

        const confirmar = window.confirm(
        `¿Esta seguro de eliminar el producto "${producto.nombre}?`
        );

        if(!confirmar) return;

    setEliminando(true);
    setError("");

    try{
        const {data,error} = await supabase
            .from("prod_react")
            .delete()
            .eq("id",producto.id)
            .select("id");

        if(error) throw error;

        if(!data|| data.length===0){
            throw new Error(
                "No se elimino el producto por falta de permisos en supabase"
            );
        }

        alert("Producto eliminado correctamente");
        navigate("/administrar")
    }catch(error){
        console.error("Error al eliminar:",error)

        setError(
            error.message || "No se pudo eliminar el producto"
        )
    }finally{
        setEliminando(false)
    }
}

    

    if(cargando){
        return <p className={styles.mensaje}>Cargando producto ... </p>
    }

    if (error && !producto) {
        return (
            <div className={styles.contenedor}>
                <p className={styles.error}>{error}</p>
                <button onClick={() => navigate("/administrar")}>
                    Volver
                </button>
            </div>
        );
    }

    if (!producto) return null;

    return (
        <section className={styles.contenedor}>
            <h2>Eliminar producto</h2>

            <div className={styles.tarjeta}>
                <img
                    src={producto.urlImagen}
                    alt={producto.nombre}
                    className={styles.imagen}
                />

                <h3>{producto.nombre}</h3>

                <p><strong>ID:</strong> {producto.id}</p>
                <p><strong>Precio:</strong> ${producto.precio}</p>
                <p><strong>Detalle:</strong> {producto.detalle}</p>

                <h4>
                    ¿Está seguro de que desea eliminar este producto?
                </h4>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.botones}>
                    <button
                        type="button"
                        className={styles.eliminar}
                        onClick={eliminarProd}
                        disabled={eliminando}
                    >
                        {eliminando ? "Eliminando..." : "Eliminar"}
                    </button>

                    <button
                        type="button"
                        className={styles.cancelar}
                        onClick={() => navigate("/administrar")}
                        disabled={eliminando}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </section>
    );
}