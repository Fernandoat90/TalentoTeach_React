import React from 'react';
import { useCart } from '../../CartContext/CartContext';
import styles from './Carrito.module.css';

function Carrito(){

    const{cart,ClearCart,getCartTotal}= useCart();

    if(cart.length===0){
        return(
            <div className={styles.cart}>
                <h1>El carrito esta vacio</h1>
                <h3>¡¡Agrega productos para continuar la compra!!</h3>
            </div>
        )
    }

    return(
        <div className={styles.cart}>
            <h1>Carrito de Compras</h1>

            {cart.map(item=>(
                <div key={item.id} className={styles.itemCarrito}>
                    <img
                        src={item.urlImagen}
                        alt={item.nombre}
                        className={styles.imagen}
                    />

                    <h3 className={styles.nombre}>
                        {item.nombre}
                    </h3>

                    <div className={styles.datos}>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio unitario: ${item.precio}</p>
                        <p>Subtotal: ${item.precio * item.quantity}</p>
                    </div>
                </div>
            ))}
            <hr/>
            <h3>Total a pagar: ${getCartTotal()}</h3>
            <button onClick={ClearCart}>Vaciar carrito</button>
        </div>
    )

}

export default Carrito;