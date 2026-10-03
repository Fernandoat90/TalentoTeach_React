import { Item } from "./Item.jsx";
import styles from "./ItemList.module.css";
export function ItemList({productos}){

    return(
        <div className={styles.tarj}>
            {productos.map(prod=>(
                <Item key={prod.id} {...prod} />
            ))}
        </div>
    );
}