import { createContext, useEffect, useState } from "react";
import {  products } from "../assets/assets";
import axios from "axios";
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const [token,setToken]=useState("");
    const [search,setSearch]=useState(false);
    const [searchValue,setSearchValue]=useState("");
    const currency = "$";
    const delivery_fees="10";
    const [cart,setCart]=useState([]);
    const [orders,setOrders]=useState([])
    const remove_cart_item=async(id,size)=>{
        try {
            const response=await axios.post(backend_url+"/api/cart/remove",{cartId:id,cartSize:size},{
              headers:{token}
            })
            if(response.data.success){
              console.log("removed")
             await fetch_cart();
            }else{
              console.log(response.data.message)
            }
          } catch (error) {
            console.log("ERROR")
          }
    }
    const addCart = async(size,product) => {
        if(!size){
          toast.error("Please select size");
          return;
        }
        try {
          const cartData={...product,size:size,quantity:1};
          const respone=await axios.post(backend_url+"/api/cart/add",{cartData},{headers:{token}});
          if(respone.data.success){
            console.log("added to cart")
            await fetch_cart();
          }else{
            console.log(respone.data.message)
          }
        } catch (error) {
          console.log("error")
        }
      }
      const edit_cart = async(id, e,size,newQuantity) => {
        newQuantity = Number(e.target.value);
        if (newQuantity < 1) {
          e.target.value = 1;
          return;
        }
        try {
          const response=await axios.post(backend_url+"/api/cart/edit",{cartId:id,cartSize:size,quantity:newQuantity},{headers:{token}});
          if(response.data.success){
            console.log("edited")
            fetch_cart();
          }else{
            console.log(response.data.message)
          }
        } catch (error) {
          console.log("ERROR");
        }
      };

      const fetch_cart=async()=>{
        try {
          const response=await axios.post("http://localhost:4000/api/cart/get",{},{headers:{token}});
          if(response.data.success){
            setCart(response.data.cart);
          }else{
            console.log(response.data.message)
          }
        } catch (error) {
          console.log("errro is occuring")
        }
      }
      
      const remove_cart=async()=>{
        try {
          const response=await axios.post("http://localhost:4000/api/cart/removeAll",{},{headers:{token}});
          if(response.data.success){
            console.log("cart removed");
            fetch_cart();
            setCart([])
          }else{
            console.log(response.data.message)
          }
        } catch (error) {
          console.log("errro is occuring")
        }
      }
      
      const fetch_order = async () => {
        try {
          const respone = await axios.post(backend_url + "/api/order/get", {}, { headers: { token } })
          if (respone.data.success) {
            setOrders(respone.data.orders);
          } else {
            console.log(respone.data.message)
          }
        } catch (error) {
          console.log("ERROR")
        }
      }  

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            console.log("token setted")
        }
         fetch_cart();
         fetch_order();
    },[token,setToken])

    const value = {
       products,
       currency,
       delivery_fees,
       search,
       setSearch,
       searchValue,
       setSearchValue,
       cart,
       setCart,
       backend_url,
       token,
       setToken,
       remove_cart_item,
       addCart,
       edit_cart,
       remove_cart,
       orders,
       setOrders,
       fetch_order,

    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
