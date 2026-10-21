import { Route, Routes } from 'react-router-dom';
import { FormularioContainer } from './Components/Forms/FormularioContainer.jsx';
import { ItemListContainer } from './Components/ItemList/ItemListContainer.jsx';
import { Layout } from './Components/Layout/Layout.jsx';
import ProductoDetalle from './Components/ProductoDetalle/ProductoDetalle.jsx';
import Carrito from './Components/Carrito/Carrito.jsx';
import styles from './App.module.css';
import { ControlDelUp } from './Components/Forms/FormsDelUpdate/ControlDelUp.jsx';
import { DeleteProduct } from './Components/Forms/FormsDelUpdate/DeleteComponent.jsx';
import { UpdateProduct } from './Components/Forms/FormsDelUpdate/UpdateComponent.jsx';



function App() {
return(
  <Routes>

    <Route element={<Layout />}>
        <Route path="/" element={<div className={styles.inicio}></div>} />
        <Route path="/productos" element={<ItemListContainer Mensaje={"Productos disponibles"} />} />
        <Route path="/form" element={<FormularioContainer />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/administrar" element={<ControlDelUp />} />
        <Route path="/cart" element={<Carrito />}/>
        <Route path="/eliminarProd" element={<DeleteProduct />} />
        <Route path="/updateProd" element={<UpdateProduct />} />
    </Route>
    
  </Routes>
  
)
}

export default App
