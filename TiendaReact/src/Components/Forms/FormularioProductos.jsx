import React from "react";
import styles from './Form.module.css';

export function FormularioProducto({datosForm,manejarCambios,manejarEnvio,manejarCambioImagen}){
    return(
        <form onSubmit={manejarEnvio}>
            <h3>Carga de Producto</h3>
            <div>
                <label>Nombre del Producto</label>
                <input
                    type="text"
                    placeholder="EJ: Pastas"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambios}
                />
            </div>

            <div>
                <label>Precio</label>
                <input
                    type="number"
                    placeholder="3000"
                    name="precio"
                    value={datosForm.precio}
                    onChange={manejarCambios}
                />
            </div>
            <div>
                <label>Imagen</label>
                <input
                    type="file"
                    placeholder="Adjunte Imagen"
                    onChange={manejarCambioImagen}
                />
            </div>

            <div>
                <label>Detalle</label>
                <input type="text"
                placeholder="Agregue el detalle del producto"
                name="detalle"
                value={datosForm.detalle}
                onChange={manejarCambios}
                />
            </div>
            
            <button type="submit">Cargar Producto</button>
        </form>
    );
}