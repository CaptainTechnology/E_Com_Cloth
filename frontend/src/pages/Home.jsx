import React, { useContext } from 'react'
import Hero from '../components/Hero'
import Latest from '../components/Latest'
import BestSeller from '../components/BestSeller'
import HomeInfo from '../components/HomeInfo'
import { ShopContext } from '../context/ShopContext'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Latest/>
        <BestSeller/>
        <HomeInfo/>
    </div>
  )
}

export default Home