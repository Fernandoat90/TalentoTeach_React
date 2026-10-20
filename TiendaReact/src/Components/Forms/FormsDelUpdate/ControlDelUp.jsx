import {useState} from "react";
import styles from "../Form.module.css";

export function ControlDelUp(){
    const [id,setId]=useState("");

    const manejarAccion = (accion)=>{
        const idProducto= Number(id);

        if(!id.trim()|| !Number.isInteger(idProducto)||idProducto<=0){
            alert("Ingrese un id valido");
            return;
        }

        if(accion==="1"){
            alert("Se va a eliminar el producto");
            return;
        }
        if(accion==="2"){
            alert("Se va a modificar el producto");
            return;
        }

    };

    return(
        <div>
        <form className={styles.form}>
                <h2>Administrar producto</h2>

            <input
            type="number"
            min="1"
            placeholder="1,2,3.... numero del id"
            value={id}
            onChange={(evento)=>setId(evento.target.value)}
            />
        <div className={styles.botones}>
            <button onClick={()=>manejarAccion("1")} className={styles.del}>
                Eliminar
            </button>

            <button onClick={()=>manejarAccion("2")} className={styles.upd}>
                Actualizar
            </button>
        </div>
            
        </form>

        </div>
    );
}