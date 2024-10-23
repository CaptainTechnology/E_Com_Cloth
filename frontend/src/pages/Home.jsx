import Hero from '../components/Hero'
import Latest from '../components/Latest'
import BestSeller from '../components/BestSeller'
import HomeInfo from '../components/HomeInfo'

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