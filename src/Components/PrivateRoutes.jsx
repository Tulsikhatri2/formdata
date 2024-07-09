import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes=({Component})=>{
    
    function navigateRoutes(){
        let login = localStorage.getItem("token")
        if (!login) {
            return <Navigate to="/login"/>
          }
        else {
            return  <Component/>
        }
    }
return(
<>
{navigateRoutes()}
</>
)  
}

export default PrivateRoutes;

