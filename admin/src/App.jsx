import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'

const App = () => {
  const isAdmin=localStorage.getItem("adminToken");
  const locate=useLocation();
  const isLogin=locate.pathname==="/login";
  return (
  <div className=''>
  {
  !isAdmin?
  <Login/>:
  <>
  <Nav />
  <hr />
  <div className="flex w-full bg-gray-50 min-h-screen ">
    <div className="fixed w-[18%] min-h-screen border-r-2 ">
      <Sidebar />
    </div>
    <div className="ml-[20%] w-[70%] mx-auto my-8 text-gray-600 text-base">
      <Routes>
        <Route path='/add' element={<Add/>} />
        <Route path='/list' element={<List/>} />
        <Route path='/orders' element={<Orders/>} />
      </Routes>
    </div>
  </div>
  </>
  }
</div>

   
  )
}

export default App


{/* <Nav />
  <hr />
  <div className="flex w-full bg-gray-50 min-h-screen ">
    <div className="fixed w-[18%] min-h-screen border-r-2 ">
      <Sidebar />
    </div>
    <div className="ml-[20%] w-[70%] mx-auto my-8 text-gray-600 text-base">
      <Routes>
        <Route path='/add' element={<Add />} />
        <Route path='/list' element={<List />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  </div> */}