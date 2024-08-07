import React, { useState, useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import LoadingPage from "../Components/LoadingPage/LoadingPage";

export default function ProtectedRoute() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  // useEffect(()=>{

  //     const token = JSON.parse(window.localStorage.getItem('store-admin'))?.accessToken

  //     if(token){
  //         (async()=>{
  //             const result = await GetRequest('/admin/checkAuth')
  //             if(result?.statusCode == 200 && result?.response == 'Authenticated'){
  //                 setIsLoading(false)
  //                 setIsAuthenticate(true)
  //             }
  //             else{
  //                 setIsLoading(false)
  //             }
  //         })()
  //     }
  //     else{
  //         setIsLoading(false)
  //     }

  // },[])

  if (!isLoading) {
    if (!isAuthenticate) {
      return <Navigate to="/signin" state={{ from: location }} />;
    }
    return <Outlet />;
  } else {
    return <LoadingPage />;
  }
}
