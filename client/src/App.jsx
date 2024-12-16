import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footeer from './components/Footeer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const {showLogin} = useContext(AppContext);


  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right' /> 
      <Navbar />
      {showLogin &&  <Login />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/result" element={<Result/>}/>
        <Route path="/buy" element={<BuyCredit/>} />
      </Routes>
      <Footeer />
    </div>
  )
}

export default App