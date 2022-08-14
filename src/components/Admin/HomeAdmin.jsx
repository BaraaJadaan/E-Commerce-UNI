
import React, { useEffect } from 'react'
import Fearured from '../Profile/Fearured'
import Chart from "./Chart"
import styled from "styled-components";
import { userData } from "./data";
import WidgetUser from './WidgetUser';
import WigetProducts from './WigetProducts';
import axios from 'axios';
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
const Container = styled.div`
 flex:5;
 margin-top:10px;
 font-size:large;
 font-weight:bold;
`;
const WidgetWrapper = styled.div`
 display:flex;
 margin-top:10px;
`;
const HomeAdmin = () => {
  const {search,ip} = useContext(AuthContext)

  return (
    <Container>
   {/* <Fearured/> */}
   <Chart data={userData} title="User Analytics" grid dataKey="Number"/>
   <WidgetWrapper>
   <WidgetUser/>
   < WigetProducts/> 
   </WidgetWrapper>

    </Container>
  )
}

export default HomeAdmin