import { useState } from "react";
import { FormularioProducto } from "./FormularioProductos";
import {supabase} from "../../supabaseClient";

export function FormularioContainer(){

    const[datosForm,setDatosForm]=useState({
        nombre:'',
        precio:'',
        detalle:'',
    });

    const [imagenFile,setImagenFile]=useState(null);

    const manejarCambios =(evento)=>{
        const {name,value}=evento.target;
        setDatosForm({
            ...datosForm,
            [name]:value
        });
    }

    const manejarCambioImagen=(evento)=>{
        setImagenFile(evento.target.files[0])
    }


    const manejarEnvio = async (evento) => {

    evento.preventDefault();

    if(
        !datosForm.nombre.trim() ||
        !datosForm.precio ||
        !datosForm.detalle.trim() ||
        !imagenFile
    ){
        alert("Complete los campos vacios");
        return
    }


    const ApiKey=import.meta.env.VITE_IMGBB_API_KEY;

    const formData = new FormData();

    formData.append('image', imagenFile);

    try {

        
        console.log("Subiendo imagen a ImgBB");

        const respuestaImgbb = await fetch(
            `https://api.imgbb.com/1/upload?key=${ApiKey}`,
            {
                method: 'POST',
                body: formData
            }
        );

        const datosImgbb = await respuestaImgbb.json();

        if (!datosImgbb.success) {
            throw new Error("La subida de la imagen falló");
        }

        const urlImagen = datosImgbb.data.url;

        console.log("Imagen subida:", urlImagen);

        const formatearTexto = (texto)
                .trim()
                .split("")
                .map((palabra,index)=>
                    index===0?
                        palabra.charAt(0).toUpperCase()+palabra.slice(1).toLowerCase():palabra)
                        .join("");

        const nombreFormateado=formatearTexto(datosForm.nombre);
        
        const detalleFormateado=formatearTexto(datosForm.detalle);
        
        const { data, error } = await supabase
            .from("prod_react")
            .insert([
                {
                    nombre: nombreFormateado,
                    precio: Number(datosForm.precio),
                    detalle: detalleFormateado,
                    url_imagen: urlImagen
                }
            ])
            .select();

        if (error) {
            throw error;
        }

        console.log("Producto guardado:", data);

        alert("Producto guardado correctamente");


        
        setDatosForm({
            nombre: '',
            precio: '',
            detalle: ''
        });

        setImagenFile(null);

    } catch (error) {

        console.error("Error en el proceso:", error);

        alert("No se pudo guardar el producto");
    }

}

    

    return(
        <FormularioProducto
            datosForm={datosForm}
            manejarCambios={manejarCambios}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
        />
    )
}

