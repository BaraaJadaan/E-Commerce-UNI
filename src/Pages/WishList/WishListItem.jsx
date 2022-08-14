import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { ButtonGroup } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
const RemoveIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
  border-radius: 50%;
  opacity:0;
  cursor:pointer;

  transition: all 0.5s ease;
  &:hover {
    color: white;
    background-color: #d61515;
    /* transform: scale(1); */
  }
`;
const Product = styled.div`
padding:10px;
  position: relative;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 7px 9px 10px -2px rgba(199, 199, 199, 0.75);
  -webkit-box-shadow: 7px 9px 10px -2px rgba(199, 199, 199, 0.75);
  -moz-box-shadow: 7px 9px 10px -2px rgba(199, 199, 199, 0.75);
  transition: all 0.5s ease;
  &:hover {
    /* background-color: #e9f5f5; */
    transform: scale(1.05);
  }
  &:hover ${RemoveIcon}{
opacity:1;
  }
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  /* height: 300px;
  object-fit: cover; */
  
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: large;
  
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const WishListItem = ({item,onRemoveWish}) => {

  const {search,ip} = useContext(AuthContext)

  const [counter, setCounter] = useState(0);

  const delteFromWishList = async(e)=>{
    e.preventDefault();
    
    await axios
    .delete(`${ip}/api/wishlist/${item.id}`, {
      headers: {
        Authorization: ` Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(({data})=>{
        // console.log(data)
    }).catch(({ response }) => {
      console.log(response);
    })
  }
  // console.log(item.id);
  return (
    <>
      <Product>
        <div onClick={delteFromWishList}>
        <RemoveIcon onClick={() =>onRemoveWish(item)}>
          <DeleteOutlineIcon />
        </RemoveIcon>
        </div>
        <ProductDetail>
          <Image src={`${ip}/storage/product_images/${item.product.image_url}`}/>
          <Details>
            <ProductName>
              <b>Product: </b>{item.product.name}
            </ProductName>
            <ProductId>
              <b>ID:</b> {item.product.id}
            </ProductId>
            <ProductColor color={item.color} />
            <ProductSize>
              <b>Size:</b> {item.product.quantity}
            </ProductSize>
          </Details>
        </ProductDetail>
        <PriceDetail>
       
        

          <ProductPrice>{item.product.price}$</ProductPrice>
        </PriceDetail>
      </Product>
      
      
    </>
  );
};

export default WishListItem;
