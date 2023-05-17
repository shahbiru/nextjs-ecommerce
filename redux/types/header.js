import { useState } from "react";
import { useEffect } from "react";

export const getHeaders = () => {
    const[state,setState] = useState()
    useEffect(() => {
        const token = localStorage.getItem('loginToken');
        setState(token)
    },[])
    
    return {
        headers: { Authorization: "Bearer " + state,
        "Content-Type": "application/json", }
    };
  };