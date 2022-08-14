import React, { useState } from "react";

import Announcement from "../../components/Announcement";

import NavBar from "../../components/NavBar";

import styled from "styled-components";
import SideBarAdmin from "../../components/Admin/SideBarAdmin";
import HomeAdmin from "../../components/Admin/HomeAdmin";
import AllProducts from "../../components/Admin/AllProducts";
import AllUsers from "../../components/Admin/AllUsers";
import AdminAnnouncmment from "../../components/Admin/AdminAnnouncmment";
import Report from "../../components/Admin/Report";
import FeaturdProducts from"../../components/Admin/FeaturdProducts";
import Loyalty from "../../components/Admin/Loyalty";
import TransAction from "../../components/Admin/TransAction";
const Container = styled.div `
  display: flex;
`;


const AdminPage = ({cartItems,wishItems}) => {
    const [home, sethome] = useState(true);
    const [products, setproducts] = useState(false);
    const [users, setusers] = useState(false);
    const [featurd, setFeaturd] = useState(false);
    const [loyalty, setLoyalty] = useState(false);
    const [transaction, settransaction] = useState(false);

    const [announcement, setAnnouncement] = useState(false);
    const [report, setReport] = useState(false);

    const handleHome = () => {
      sethome(true);
      setproducts(false);
      setusers(false);
      setAnnouncement(false);
      setReport(false);
      setFeaturd(false)
      setLoyalty(false)
      settransaction(false)
    };
    const handleProducts = () => {
      sethome(false);
      setproducts(true);
      setusers(false);
      setAnnouncement(false);
      setReport(false);
      setFeaturd(false)
      setLoyalty(false)
      settransaction(false)


    };
    const handleUsers = () => {
      sethome(false);
      setproducts(false);
      setusers(true);setAnnouncement(false);
      setReport(false);
      setFeaturd(false)
      setLoyalty(false)
      settransaction(false)


    };
    const handleAnnouncement = () => {
      sethome(false);
      setproducts(false);
      setusers(false);
      setAnnouncement(true);
      setReport(false);
      setFeaturd(false);
      setLoyalty(false)
      settransaction(false)


    };
    const handleReport =()=>{
      sethome(false);
      setproducts(false);
      setusers(false);
      setAnnouncement(false);
      setReport(true);
      setFeaturd(false)
      setLoyalty(false)
      settransaction(false)

    }
    const handleFeaturd =()=>{
      sethome(false);
      setproducts(false);
      setusers(false);
      setAnnouncement(false);
      setReport(false);
      setFeaturd(true)
      setLoyalty(false)
      settransaction(false)

    }
    const handleLoyalty =()=>{
      sethome(false);
      setproducts(false);
      setusers(false);
      setAnnouncement(false);
      setReport(false);
      setFeaturd(false)
      setLoyalty(true)
      settransaction(false)

    }
    const handleTrans =()=>{
      sethome(false);
      setproducts(false);
      setusers(false);
      setAnnouncement(false);
      setReport(false);
      setFeaturd(false)
      setLoyalty(false)
      settransaction(true)

    }
  return (
    <>
     <NavBar wishItems={wishItems} cartItems={cartItems} />
      <Announcement />
      <Container>
        <SideBarAdmin
           home={handleHome}
           products={handleProducts}
           users={handleUsers}
           announcement={handleAnnouncement}
           report={handleReport}
           featurd={handleFeaturd}
           loyalty={handleLoyalty}
           trans={handleTrans}/>
        {home&&
        <HomeAdmin/>}
        
        {products&& <AllProducts/>}
        {users&& <AllUsers/>}
        {featurd&& <FeaturdProducts/>}
        {announcement&& <AdminAnnouncmment/>}
        {transaction&&<TransAction/>}
        {report&& <Report/>}
        {loyalty&&<Loyalty/>}
      </Container>
    
    </>
  )
}

export default AdminPage