import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import styles from "../Form.module.css";

export function UpdateProduct() {
    const location = useLocation();
    const navigate = useNavigate();

    const id = location.state?.id;

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [actualizando, setActualizando] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    
    useEffect(() => {
        const buscarProd = async () => {
            if (
                id === undefined ||
                id === null ||
                !Number.isInteger(Number(id)) ||
                Number(id) <= 0
            ) {
                setError("No se recibió un ID válido.");
                setCargando(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from("prod_react")
                    .select("*")
                    .eq("id", id)
                    .maybeSingle();

                if (error) throw error;

                if (!data) {
                    setError("El producto solicitado no existe.");
                    return;
                }

                
                setProducto({
                    id: data.id,
                    nombre: data.nombre ?? "",
                    precio: String(data.precio ?? ""),
                    detalle: data.detalle ?? "",
                    urlImagen: data.url_imagen ?? ""
                });
            } catch (error) {
                console.error("Error al buscar producto:", error);
                setError("No se pudo cargar el producto.");
            } finally {
                setCargando(false);
            }
        };

        buscarProd();
    }, [id]);

    
    const manejarCambio = (evento) => {
        const { name, value } = evento.target;

        setProducto((productoActual) => ({
            ...productoActual,
            [name]: value
        }));
    };

    
    const updateProd = async (evento) => {
        evento.preventDefault();

        if (!producto || actualizando) return;

        if (
            !producto.nombre.trim() ||
            producto.precio.trim() === "" ||
            !Number.isFinite(Number(producto.precio)) ||
            Number(producto.precio) < 0
        ) {
            setError("Ingresá un nombre y un precio válido.");
            return;
        }

        const confirmar = window.confirm(
            `Se actualizarán los datos del producto "${producto.nombre}". ¿Deseás confirmar?`
        );

        if (!confirmar) return;

        setActualizando(true);
        setError("");
        setMensaje("");

        try {
            const { data, error } = await supabase
                .from("prod_react")
                .update({
                    nombre: producto.nombre.trim(),
                    precio: Number(producto.precio),
                    detalle: producto.detalle,
                    url_imagen: producto.urlImagen
                })
                .eq("id", producto.id)
                .select()
                .maybeSingle();

            if (error) throw error;

            if (!data) {
                throw new Error(
                    "No se actualizaron los datos. Verificá los permisos de UPDATE en Supabase."
                );
            }

            setProducto({
                id: data.id,
                nombre: data.nombre ?? "",
                precio: String(data.precio ?? ""),
                detalle: data.detalle ?? "",
                urlImagen: data.url_imagen ?? ""
            });

            setMensaje("¡Producto actualizado correctamente!");

        } catch (error) {
            console.error("Error al actualizar:", error);
            setError(
                error.message || "No se pudo actualizar el producto."
            );
        } finally {
            setActualizando(false);
        }
    };

    if (cargando) {
        return <p>Cargando producto...</p>;
    }

    if (error && !producto) {
        return (
            <div>
                <p>{error}</p>
                <button
                    type="button"
                    onClick={() => navigate("/administrar")}
                >
                    Volver
                </button>
            </div>
        );
    }

    if (!producto) return null;

    return (
        <section>
            
            <form onSubmit={updateProd} className={styles.form}>
            
            <h2>Actualizar producto</h2>

            <p>
                <strong>ID:</strong> {producto.id}
            </p>

            
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={producto.nombre}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="precio">Precio:</label>
                    <input
                        id="precio"
                        name="precio"
                        type="number"
                        min="0"
                        step="any"
                        value={producto.precio}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="detalle">Detalle:</label>
                    <textarea
                        id="detalle"
                        name="detalle"
                        value={producto.detalle}
                        onChange={manejarCambio}
                    />
                </div>


                {producto.urlImagen && (
                    <div>
                        <p>Vista previa:</p>
                        <img
                            src={producto.urlImagen}
                            alt={producto.nombre}
                        />
                    </div>
                )}

                {error && <p style={{ color: "red" }}>{error}</p>}

                {mensaje && (
                    <p style={{ color: "green" }}>{mensaje}</p>
                )}

                <button
                    type="submit"
                    disabled={actualizando}
                >
                    {actualizando ? "Actualizando..." : "Guardar cambios"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/administrar")}
                    disabled={actualizando}
                >
                    Volver
                </button>
            </form>
        </section>
    );
}
