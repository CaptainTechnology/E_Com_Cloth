import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import Search from '../components/Search';

const Collection = () => {

  const { products, search,searchValue } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [order,setOrder]=useState("")
  const [category, setCategory] = useState({
    Men: "",
    Women: "",
    Kids: ""
  });

  const [subCategory, setSubCategory] = useState({
    Topwear: "",
    Bottomwear: "",
    Winterwear: ""
  });

  const category_handler = (e) => {
    const { name, value } = e.target;
    if (e.target.checked) {
      setCategory(prev => ({
        ...prev,
        [name]: value
      }))
    } else {
      setCategory(prev => ({
        ...prev,
        [name]: ""
      }))
    }

  }

  const subCategory_handler = (e) => {
    const { name, value } = e.target;
    if (e.target.checked) {
      setSubCategory(prev => ({
        ...prev,
        [name]: value
      }))
    } else {
      setSubCategory(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }
  const [filterProduct, setFilterProduct] = useState([]);

  const filter = () => {
    const filterP = products.slice();
    
    if(searchValue){
    const newP=filterP.filter(item=>item.name.toLowerCase().includes(searchValue.toLowerCase()));
    return newP;
    }
    let newP;
    if (!subCategory.Topwear && !subCategory.Bottomwear && !subCategory.Winterwear && !category.Men && !category.Women && !category.Kids) {
      return filterP;
    }
    if (!subCategory.Topwear && !subCategory.Bottomwear && !subCategory.Winterwear) {
      newP = filterP.filter(item =>
        (item.category === category.Men || item.category === category.Women || item.category === category.Kids)
      );
      return newP;
    }
    if (!category.Men && !category.Women && !category.Kids) {
      newP = filterP.filter(item => item.subCategory === subCategory.Bottomwear || item.subCategory === subCategory.Topwear || item.subCategory === subCategory.Winterwear);
      return newP;
    }
    newP = filterP.filter(item => (item.category === category.Men || item.category === category.Women || item.category === category.Kids) && (item.subCategory === subCategory.Bottomwear || item.subCategory === subCategory.Topwear || item.subCategory === subCategory.Winterwear));
    return newP;
  }

  useEffect(() => {
    const newP = filter();
    const sortedProducts = [...newP].sort((a,b)=>{
      if(order==="relavent"){
        return;
      }
      if(order==="low-high"){
        return a.price-b.price;
      }
      if(order==="high-low"){
        return b.price-a.price;
      }
    })
    setFilterProduct(sortedProducts);
  }, [category, subCategory,order,setOrder,searchValue]);
  return (
    <>
      {
        search ?
          <Search />
          : null
      }
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t" >
        <div className="min-w-60">
          <p className="my-2 text-xl flex items-center cursor-pointer gap-2" onClick={() => {
            if (showFilter) {
              setShowFilter(false)
            } else {
              setShowFilter(true)
            }
          }}>
            FILTERS
            <img
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : "rotate-270"}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>
          <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter ? "block" : "hidden"}`}>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" name='Men' value="Men" onChange={category_handler} /> Men
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" name='Women' onChange={category_handler} value="Women" /> Women
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" name='Kids' onChange={category_handler} value="Kids" /> Kids
              </p>
            </div>
          </div>
          <div className={`border border-gray-300 pl-5 py-3 my-5  sm:block ${showFilter ? "block" : "hidden"}`}>
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" onChange={subCategory_handler} value="Topwear" name="Topwear" /> Topwear
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" onChange={subCategory_handler} value="Bottomwear" name="Bottomwear" /> Bottomwear
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" onChange={subCategory_handler} value="Winterwear" name="Winterwear" /> Winterwear
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <div className="inline-flex gap-2 items-center mb-3">
              <p className="text-gray-500">
                ALL <span className="text-gray-700 font-medium">COLLECTIONS</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700" />
            </div>
            <select className="border-2 border-gray-300 text-sm px-2" onChange={(e)=>{
              setOrder(e.target.value);
            }}>
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProduct.map((product, index) => (
              <Link key={index} onClick={() => scroll(0, 0)} className="text-gray-700 cursor-pointer" to={`/product/${product._id}`}>
                <div className="overflow-hidden">
                  <img className="hover:scale-110 transition ease-in-out" src={product.image[0]} alt="" />
                </div>
                <p className="pt-3 pb-1 text-sm">{product.name}</p>
                <p className="text-sm font-medium">${product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};


export default Collection



