import React from 'react'
import Fearured from './Fearured'
import Products from '../Products'
import styled from "styled-components";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
const Container = styled.div`
 flex:5;
 margin-top:10px;
`;
const ProductsProfile = ({products}) => {
  const {search,ip} = useContext(AuthContext)

  return (
    <Container>
        {/* <Fearured/> */}
        <h1 className="ti">My Products</h1>

        <Products products={products}/>
    </Container>
  )
}

export default ProductsProfile