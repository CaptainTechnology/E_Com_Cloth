import { createContext, useEffect, useState } from "react";
import { products as prod } from "../assets/assets";
import axios from "axios";
import { toast } from 'react-toastify';

export const ShopContext = createContext();


const ShopContextProvider = (props) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [search, setSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const currency = "₹";
  const delivery_fees = "10";
  const [cart, setCart] = useState([]);
  const [tempCart, SetTempCart] = useState([]);
  const [orders, setOrders] = useState([])

  const delevery_charge = 10;

  const fetch_product = async () => {
    try {
      setProducts(prod)
      const response = await axios.get(backend_url + "/api/product/get", {});
      if (response.data.success) {
        if(response.data.data.length<=0){
          setProducts(prod);
        }else{
        setProducts(response.data.data);
        }
      } else {
        setProducts(prod)
      }
    } catch (error) {
      console.log("error occurd ")
      setProducts(prod)
    }
  }

  const remove_cart_item = async (id, size) => {
    if (!token) {
        const new_cart =tempCart.filter(item => !(item._id === id && item.size === size));
      SetTempCart(new_cart);
      return;
    }
    try {
      const response = await axios.post(backend_url + "/api/cart/remove", { cartId: id, cartSize: size }, {
        headers: { token }
      })
      if (response.data.success) {
        console.log("removed")
        await fetch_cart();
      } else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log("ERROR")
    }
  }
  const addCart = async (size, product) => {
    if (!size) {
      toast.error("Please select size");
      return;
    }
    if (!token) {
      const cartData = { ...product, size: size, quantity: 1 };
      const isAvailable = tempCart.find(item => item._id === product._id && item.size === size);
      if (isAvailable) {
        SetTempCart(prev => (
          prev.map(item => item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
          )
        ));
      } else {
        SetTempCart(prev => ([
          ...prev,
          cartData
        ]));
      }
      return;
    }
    try {
      const cartData = { ...product, size: size, quantity: 1 };
      const respone = await axios.post(backend_url + "/api/cart/add", { cartData }, { headers: { token } });
      if (respone.data.success) {
        console.log("added to cart")
        await fetch_cart();
      } else {
        console.log(respone.data.messsage)
      }
    } catch (error) {
      console.log("error")
    }
  }
  const edit_cart = async (id, e, size, newQuantity) => {
    newQuantity = Number(e.target.value);
    if (newQuantity < 1) {
      e.target.value = 1;
      return;
    }
    if(!token){
      const new_cart=tempCart.map((item)=>{
        if(item._id===id && item.size===size){
          return {...item,quantity:newQuantity}
        }
        return item
      });
      SetTempCart(new_cart);
      return;
    }
    try {
      const response = await axios.post(backend_url + "/api/cart/edit", { cartId: id, cartSize: size, quantity: newQuantity }, { headers: { token } });
      if (response.data.success) {
        console.log("edited")
        fetch_cart();
      } else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log("ERROR");
    }
  };

  const fetch_cart = async () => {
    try {
      const response = await axios.post(backend_url + "/api/cart/get", {}, { headers: { token } });
      if (response.data.success) {
        setCart(response.data.cart);
      } else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log("errro is occuring")
    }
  }

  const remove_cart = async () => {
    try {
      const response = await axios.post(backend_url + "/api/cart/removeAll", {}, { headers: { token } });
      if (response.data.success) {
        console.log("cart removed");
        fetch_cart();
        setCart([])
      } else {
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      console.log("token setted")
    }
    // fetch_product();
    fetch_cart();
    fetch_order();
  }, [token, setToken])

  useEffect(()=>{
    fetch_product();
  },[])
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
    delevery_charge,
    fetch_product,
    tempCart

  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
