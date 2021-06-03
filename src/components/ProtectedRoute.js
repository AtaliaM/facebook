import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const cookies = new Cookies();

   return (
      <Route {...rest} render= {
         (props)=> {
            if(cookies.get("userToken")) { //if user is logged in
            return <Component {...props}/>
            }
            else {
               return <Redirect to= {
                  {
                     pathname:"/",
                     state: {
                        from: props.location //the location we trying to go to
                     }
                  } 
               }/>
            }
      }} />
      
   )
}

export default ProtectedRoute;