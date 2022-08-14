import React, { useState,useEffect } from "react";
import Announcement from "../../components/Announcement";
import InfoProfile from "../../components/Profile/InfoProfile";
import NavBar from "../../components/NavBar";
import SideBarProfile from "../../components/Profile/SideBarProfile";
import styled from "styled-components";
import EditProfile from "../../components/Profile/EditProfile";
import Fearured from "../../components/Profile/Fearured";
import Products from "../../components/Products";
import ProductsProfile from "../../components/Profile/ProductsProfile";
import History from "../../components/Profile/History";
import { useFetch } from "../../hooks/useFetch";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
const Container = styled.div`
  display: flex;
`;
const WrraperInfo = styled.div`
  display: flex;

  flex: 5;
`;
const WrraperPending = styled.div`
 position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`;
const ProfilePage = ({ cartItems,wishItems }) => {
  const{id} = useParams();
  const {search,ip} = useContext(AuthContext)

  const [accessToken, setAccessToken] = useState("")
  const [userId, setUserID] = useState("")
  const [home, sethome] = useState(true);
  const [product, setproduct] = useState(false);
  const [history, sethistory] = useState(false);
  const [userName, setUserName] = useState("")
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
};
  const handleHome = () => {
    sethome(true);
    setproduct(false);
    // sethistory(false);
  };
  const handleProduct = () => {
    sethome(false);
    setproduct(true);
    // sethistory(false);
  };
  const handlehistory = () => {
    sethome(false);
    setproduct(false);
    // sethistory(true);
  };
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([])
  useEffect(()=>{
    const data1 =localStorage.getItem('accessToken')
 const data2 = localStorage.getItem('userID')
 const data3= localStorage.getItem('userName')
 if(data1!==null){setAccessToken(data1)
 }
 if(id!=null){setUserID(id)
   }
   else{setUserID(data2)}
   if(data3!==null){setUserName(data3)
     }
  })
 
  const url = `${ip}/api/users/`+userId
  const { error, isPending, data: info } = useFetch(url)

  
useEffect(() => {
fetchProducts();
}, [])
const fetchProducts = async () => {
await axios.get(`${ip}/api/myProducts`,
 { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} })
.then(({ data }) =>
{
  // console.log(data)
  setProducts(data)}
  )
}
//  console.log(info);
// console.log(id);
// console.log(id);


  return (
    <>
      <NavBar wishItems={wishItems} cartItems={cartItems} />
      <Announcement />
      <Container>
      {isPending &&<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      
      > </Backdrop>
        }
       {!id && <SideBarProfile
          home={handleHome}
          product={handleProduct}
          // history={handlehistory}
          id={id}
        />}
        <WrraperPending>
        
        {isPending &&<CircularProgress color="inherit" />}
        </WrraperPending>
        {home && (
          <WrraperInfo>


      {info&&<InfoProfile id={id} info={info} />}
      {info&& !id && <EditProfile accessToken={accessToken} info={info}/>} 
          </WrraperInfo>
        )}
        {product && <ProductsProfile products={products} />}
        {/* {history&& <History/>} */}
      </Container>
    </>
  );
};

export default ProfilePage;
