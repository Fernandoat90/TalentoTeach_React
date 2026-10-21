import { useLocation } from "react-router-dom";

export function DeleteProduct(){
    const location=useLocation();
    const id=location.state?.id;

    return alert(id);
}