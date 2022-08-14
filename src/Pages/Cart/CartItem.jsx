import React, { useState } from "react";
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
    transform: scale(1);
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

const CartItem = ({item,onAdd,onRemove}) => {

  const {search,ip} = useContext(AuthContext)

  const [counter, setCounter] = useState(0);
  const [cartId, setcartId] = useState()
  // const handleIncrement = () => {
  //   setCounter((prev) => prev + 1);
  // };
  // const handleDecrement = (counter) => {
  //   setCounter((prev) => prev - 1);
  // };
  // const displayCounter = counter > 0;

  const delteFromCart = async(e)=>{
    e.preventDefault();
    // setcartId()
    await axios
    .delete(`${ip}/api/deletefromcart/${item.cart_id}?product_id=${item.product_id}`

    ).then(({data})=>{
        console.log(localStorage.getItem('cartId'))
    }).catch(({ response }) => {
      console.log(response);
    })
  }
  return (
    <>
      <Product>
        <RemoveIcon onClick={delteFromCart}>
          <DeleteOutlineIcon />
        </RemoveIcon>
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
              <b>Size:</b> 37.5
            </ProductSize>
          </Details>
        </ProductDetail>
        <PriceDetail>
          {/* <ButtonGroup size="small" aria-label="small outlined button group">
            <ProductAmountContainer>
              <Add style={{ cursor:'pointer', color: "green" }} onClick={() => onAdd(item)}>
                +
              </Add>
              { (
                <ProductAmount disabled>{item.product.quantity}</ProductAmount>
              )}
              { (
                <Remove style={{cursor:'pointer', color: "red" }} onClick={() =>onRemove(item)} >
                  -
                </Remove>
              )}
            </ProductAmountContainer>
          </ButtonGroup> */}
     
          <ProductPrice>{item.product.price}$</ProductPrice>
        </PriceDetail>
      </Product>
      
      
    </>
  );
};

export default CartItem;
