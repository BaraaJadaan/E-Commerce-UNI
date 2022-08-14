// import {useParams} from "react-router-dom";
import NavBar from '../components/NavBar';
import Announcement from "../components/Announcement";
import Details from '../components/Details';
import Reviews from '../components/Reviews';
import Footer from "../components/Footer";
import React from 'react'
import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
 const  ProductPage = ({cartItems,wishItems}) => {
    // const {id} = useParams()
    const {search,ip} = useContext(AuthContext)

  return (

    <div className="title">
      {/* ProductPage - {id} */}
      <div className="titlee" style={{minHeight: '100vh'}}>
      <NavBar cartItems={cartItems} wishItems={wishItems}/> 
      <Announcement />
       <Details/>
      {/* <Reviews/> */}
      </div>
      <Footer />
    </div>
  )
}
export default ProductPage;