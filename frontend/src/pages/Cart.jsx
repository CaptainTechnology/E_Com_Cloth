import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext';

const Cart = () => {

  const {cart,remove_cart_item, setCart,backend_url,edit_cart,tempCart,token,setToken,currency } = useContext(ShopContext);
  const [total, setTotal] = useState(0);
  
  const navigate=useNavigate();
 
  useEffect(() => {
    let fees = 0;
    (token?cart:tempCart).forEach(item => {
      fees += item.price * item.quantity;
    });
    setTotal(fees);
  }, [cart,tempCart,setToken]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">YOUR <span className="text-gray-700 font-medium">CART</span></p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      <div>
        {(token?cart:tempCart).map((item, index) => (
            <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20"  src={item.image[0]} alt="" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{item.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min="1"
                max="10"
                defaultValue={item.quantity}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
                    e.preventDefault(); // Prevent other keyboard inputs
                  }
                }}
                onChange={(e) => { edit_cart(item._id, e,item.size,item.quantity); }}
              />
              <img className="w-4 mr-4 sm:w-5 cursor-pointer" alt="" src={assets.bin_icon} onClick={() => { remove_cart_item(item._id,item.size); }} />
            </div>
          ))
        }     
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <div className="w-full">
            <div className="text-2xl">
              <div className="inline-flex gap-2 items-center mb-3">
                <p className="text-gray-500">CART <span className="text-gray-700 font-medium">TOTALS</span></p>
                <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {total}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency} {total > 0 ? 10 : 0} </p>
              </div>
              <hr />
              <div className="flex justify-between">
                <b>Total</b>
                <b>{currency} {total > 0 ? total + 10 : 0} </b>
              </div>
            </div>
          </div>
          <div className="w-full text-end">
            <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={()=>{navigate("/placeOrder")}}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;




















































































































































































// import React, { useContext, useEffect, useState } from 'react';
// import { assets } from '../assets/assets';
// import { useNavigate} from 'react-router-dom'
// import axios from 'axios'
// import { ShopContext } from '../context/ShopContext';

// const Cart = () => {

//   const [cart, setCart ] = useState([]);
//   const [total, setTotal] = useState(0);
//   const {token}=useContext(ShopContext)

//   const navigate=useNavigate();
//   const fetch_cart=async()=>{
//     try {
//       const response=await axios.post("http://localhost:4000/api/cart/get",{},{headers:{token}});
//       if(response.data.success){
//         setCart(response.data.cart);
//       }else{
//         console.log(response.data.message)
//       }
//     } catch (error) {
//       console.log("errro is occuring")
//     }
//   }

//   const change_quantity = (id, e) => {
//     const newQuantity = Number(e.target.value);
//     if (newQuantity < 1) {
//       e.target.value = 1;
//       return;
//     }

//     const newCart = cart.map(item => {
//       if (item._id === id) {
//         return { ...item, quantity: newQuantity }; 
//       }
//       return item; 
//     });
//     setCart(newCart);
//     console.log(newCart)
//   };

//   const removeCart = (id,size) => {
//     const new_cart = cart.filter(item => !(item._id === id && item.size === size));
//     setCart(new_cart);
//   };

//   useEffect(() => {
//     fetch_cart();
//     let fees = 0;
//     cart.forEach(item => {
//       fees += item.price * item.quantity;
//     });
//     setTotal(fees);
//   }, [token]);

//   return (
//     <div className="border-t pt-14">
//       <div className="text-2xl mb-3">
//         <div className="inline-flex gap-2 items-center mb-3">
//           <p className="text-gray-500">YOUR <span className="text-gray-700 font-medium">CART</span></p>
//           <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
//         </div>
//       </div>
//       <div>
//         {
//           cart.map((item, index) => (
//             <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
//               <div className="flex items-start gap-6">
//                 <img className="w-16 sm:w-20" alt="" src={item.image[0]} />
//                 <div>
//                   <p className="text-xs sm:text-lg font-medium">{item.name}</p>
//                   <div className="flex items-center gap-5 mt-2">
//                     <p>${item.price}</p>
//                     <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
//                   </div>
//                 </div>
//               </div>
//               <input
//                 className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                 type="number"
//                 min="1"
//                 max="10"
//                 defaultValue={item.quantity}
//                 onKeyDown={(e) => {
//                   if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
//                     e.preventDefault(); // Prevent other keyboard inputs
//                   }
//                 }}
//                 onChange={(e) => { change_quantity(item._id, e); }}
//               />
//               <img className="w-4 mr-4 sm:w-5 cursor-pointer" alt="" src={assets.bin_icon} onClick={() => { removeCart(item._id,item.size); }} />
//             </div>
//           ))
//         }     
//       </div>
//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <div className="w-full">
//             <div className="text-2xl">
//               <div className="inline-flex gap-2 items-center mb-3">
//                 <p className="text-gray-500">CART <span className="text-gray-700 font-medium">TOTALS</span></p>
//                 <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 mt-2 text-sm">
//               <div className="flex justify-between">
//                 <p>Subtotal</p>
//                 <p>$ {total}</p>
//               </div>
//               <hr />
//               <div className="flex justify-between">
//                 <p>Shipping Fee</p>
//                 <p>$ {total > 0 ? 10 : 0} </p>
//               </div>
//               <hr />
//               <div className="flex justify-between">
//                 <b>Total</b>
//                 <b>$ {total > 0 ? total + 10 : 0} </b>
//               </div>
//             </div>
//           </div>
//           <div className="w-full text-end">
//             <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={()=>{navigate("/placeOrder")}}>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
