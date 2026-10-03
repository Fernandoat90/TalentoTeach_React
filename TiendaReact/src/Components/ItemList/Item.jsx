import styles from './ItemList.module.css';
import { useState } from 'react';
import {useCart} from '../../CartContext/CartContext.jsx';
import { Link } from "react-router-dom";

export function Item({id,nombre,precio,urlImagen}){

    const producto={id,nombre,precio,urlImagen};

    const [cantidad,setCantidad]=useState(0);

    const {addToCart}=useCart();

    const handleAddToCart=()=>{
        if(cantidad>0){
            addToCart(producto,cantidad);
        alert(`Agrego la cantidad de ${cantidad} unidad/es de ${nombre} al carrito`);
        }else{
            alert("No agrego productos al carrito");
        }
        
    }

    
    const incrementar=()=>{
        if(cantidad<100){
            setCantidad(cantidad+1);
        }
    }

    const decrementar =()=>{
        if (cantidad>0){
            setCantidad(cantidad-1);
        }
    }

    return(
        <div className={styles.tarjCont}>

                <h3>{nombre}</h3>
                <img className={styles.img} src={urlImagen} alt={nombre} />
                <p>Precio: ${precio}</p>
                <Link to={`/producto/${id}`} className={styles.detalle}>Ver detalle</Link>
                <div>
                <button onClick={decrementar} className={styles.many}>-</button>

                        <span className={styles.many}>{cantidad}</span>

                <button onClick={incrementar} className={styles.many}>+</button>
                </div>

                <button onClick={handleAddToCart}>Agregar al carrito</button>
            
        </div>
    );
}