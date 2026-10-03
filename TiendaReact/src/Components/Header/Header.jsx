import { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../CartContext/CartContext.jsx";

function Header() {

    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    return (
        <header className={styles.header}>

            <div className={styles.headerTop}>

                <img src="/img/hotPizza.png" className={styles.logo}/>

                <button
                    className={styles.menuButton}
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-label="Abrir menú"
                >
                    ☰
                </button>

            </div>

            <nav className={`${styles.nav} ${menuAbierto ? styles.navAbierto : ""}`}>
                <ul>

                    <li>
                        <Link to="/" onClick={cerrarMenu}>
                            Inicio
                        </Link>
                    </li>

                    <li>
                        <Link to="/productos" onClick={cerrarMenu}>
                            Productos
                        </Link>
                    </li>

                    <li>
                        <Link to="/form" onClick={cerrarMenu}>
                            Formulario
                        </Link>
                    </li>

                    <li>
                        <Link to="/cart" onClick={cerrarMenu}>
                            <span className={styles.cart}>🛒</span>

                            {totalItems > 0 && (
                                <span className={styles.contador}>
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </li>

                </ul>
            </nav>

        </header>
    );
}

export default Header;
