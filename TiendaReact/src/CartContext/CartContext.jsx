import React,{useState,useContext,createContext} from 'react';
import { Item } from '../Components/ItemList/Item';

export const CartContext = createContext();

export const useCart=()=>{
    const context=useContext(CartContext);

    if(!context){
        throw new Error('useCart debe ser usado dentro de CartProvider');
    }
    return context;
};

export const CartProvider=({children})=>{
    const [cart,setCart]=useState([]);

    const addToCart=(product,quantity)=>{
        
        const ItemInCart = cart.find(item=>item.id===product.id);

        if(ItemInCart){
            const UpdateCart=cart.map(item=>
                item.id===product.id ? {...item , quantity:item.quantity + quantity}
                :item
            );
            setCart(UpdateCart);
        }else{
            setCart(prevCart => [...prevCart,{...product , quantity }]);
        }
    };
    const ClearCart=()=>{
        setCart([]);
    }

    const getCartQuantity= ()=>{
        return cart.reduce((acc,item)=>acc + item.quantity , 0);
    };

    const getCartTotal=()=>{
        return cart.reduce((acc,item)=>acc + item.precio * item.quantity , 0);
    }

    return(
        <CartContext.Provider value={{cart,addToCart,ClearCart,getCartQuantity,getCartTotal}} >
            {children}
        </CartContext.Provider>

    );
}