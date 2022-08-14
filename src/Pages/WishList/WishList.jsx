import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Navbar from "../../components/NavBar";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import WishListItem from "./WishListItem";
import { Cartiteme } from "../../components/data";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
const Container = styled.div` 
`;

const Wrapper = styled.div`
  padding: 20px;
  font-size: large;
  font-weight: bold;
  min-height: 100vh;
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

const TopButton = styled.button`
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
const WishList = ({wishItems,cartItems,onAddWish,onRemoveWish}) => {
  const [wishList, setWishList] = useState([])
  const {search,ip} = useContext(AuthContext)

  useEffect(() => {
    fetchWishlistItem();
    }, [])
    const fetchWishlistItem = async () => {
      await axios.get(`${ip}/api/wishlist`,
       { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} })
      .then(({ data }) =>
      {
        console.log(data)
        setWishList(data)}
        ).catch(({Response})=>{
          console.log(Response);
        })
      }

  return (
    <Container>
      <Navbar wishItems={wishItems} cartItems={cartItems}/>
      <Announcement/>
      <Wrapper>
        <Top>
            <Link to={"/"}>
      <TopButton>CONTINUE SHOPPING</TopButton>
      </Link>
         
          </Top>
          <Bottom>
            <Info>
           
              {wishList.map(item=>(
                 <WishListItem onRemoveWish={onRemoveWish}   item={item}/>
              ))}
            
            </Info>
           
          </Bottom>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default WishList;