import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Navbar from "../../components/NavBar";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import CartItem from "./CartItem";
import { Cartiteme } from "../../components/data";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  font-size: large;
  font-weight: bold;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

`;

const TopButton = styled.button `
  padding: 10px;
  font-weight: 600;
  border-radius:20px;
  cursor: pointer;
  border:none;
  /* border: ${(props) => props.type === "filled" && "none"}; */
  background-color: ${(props) =>
    props.type === "filled" ? "teal" : "teal"};
  color: white;
`;

const TopTexts = styled.div`
 
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
 
`;

const Info = styled.div`
    margin-right: 20px;

  flex: 3;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;

`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "bold"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  border:none;
`;
const Cart = ({cartItems,onAdd,onRemove,wishItems}) => {
  const {search,ip} = useContext(AuthContext)

  const [cartItem, setCartItem] = useState([])
  const [order, setOrder] = useState()
  const [Price, setPrice] = useState()

  // const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice =Math.floor(Price * 0.14);
  // const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  // const totalPrice =Math.floor( Price+taxPrice) ;
  

  useEffect(() => {
    fetchCartItems();
    fetchOrderList();
    }, [order])
    const fetchCartItems = async () => {
      await axios.get(`${ip}/api/getCartItems/${localStorage.getItem('cartId')}`,
       { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} })
      .then(({ data }) =>
      {
       

        console.log(data)
       setCartItem(data)}
        ).catch(({Response})=>{
          console.log();
        })
      }
      const fetchOrderList = async () => {
      await axios.get(`${ip}/api/order/${order}`,
       { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} })
      .then(({ data }) =>
      {
        console.log(data.order[0].totalPrice)
        setPrice(data.order[0].totalPrice)

        // setCartItem(data)}
      }).catch(({Response})=>{
          console.log();
        })
      }


      const PostOrder = async (e) => {
        e.preventDefault();
       
            const formData = new FormData();
          // formData.append('_method', 'PATCH')
      
          formData.append('cartKey', localStorage.getItem('cartKey'))
          // formData.append('quantity', 1)
          // formData.append('product_id', )
          await axios
          .post(`${ip}/api/order`, formData, {
            headers: {
              Authorization: ` Bearer ${localStorage.getItem('accessToken')}`
            }
          }).then(({data})=>{
              // console.log(data)
              setOrder(data.orderID)
               localStorage.removeItem('cartKey')
        localStorage.removeItem('cartId')
          }).catch(({ response }) => {
            console.log(response);
          })
        
      };
  return (
    <Container>
      <Navbar wishItems={wishItems}  cartItems={cartItems}/>
      <Announcement/>
      <Wrapper>
        <Top>
     
         
          <TopButton type="filled" onClick={PostOrder}>CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              {cartItem.map(item=>(
                 <CartItem onRemove={onRemove} onAdd={onAdd} setCartItem={setCartItem} item={item}/>
              ))}
            
            </Info>
            <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>All We Take</SummaryItemText>
              <SummaryItemPrice>14%</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
            <SummaryItemText>Price </SummaryItemText>
              <SummaryItemPrice>{Price}</SummaryItemPrice>
            </SummaryItem>
          { Price&& <SummaryItem>
              <SummaryItemText>Tax</SummaryItemText>
              <SummaryItemPrice>{taxPrice}</SummaryItemPrice>
            </SummaryItem>}
            {/* <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{totalPrice}</SummaryItemPrice>
            </SummaryItem> */}
            <Button onClick={PostOrder}>CHECKOUT NOW</Button>
          </Summary>
          </Bottom>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Cart