import React, { useState } from "react";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import CategoryCard from "../components/CategoryCard";
import SmlCtgCrds from "../components/SmlCtgCrds";
// import Products from "../components/Products";
import ProductsFeatured from "../components/ProductsFeatured";

import Footer from "../components/Footer";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Announcement from "../components/Announcement";
import axios from "axios";
import ActionButton2 from "../components/ActionButton2";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AuthContext   from "../hooks/AuthProvider";
// import { useContext } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// import ActionButton from '../components/ActionButton';
export default function Home({ onAdd, cartItems, onAddWish, wishItems }) {
  const {search,ip} = useContext(AuthContext)


  const [accessToken, setAccessToken] = useState(
    `${localStorage.getItem("accessToken")}`
  );
  const [userId, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [cartKey, setCartKey] = useState("");
  const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([])

  const createCart = async () => {
    // e.preventDefault();
    // setCartKey(`${localStorage.getItem('cartKey')}`)
    //  console.log("assssssssssssssssssssssssssssssssssssssssssssssssssss")
    if (
      localStorage.getItem("cartKey") === null ||
      localStorage.getItem("cartId") === null
    ) {
      await axios
        .post(`${ip}/api/cart`, [], {
          headers: {
            Authorization: ` Bearer ${accessToken}`,
          },
        })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("cartKey", data.cartKey);
          localStorage.setItem("cartId", data.cartId);
          // setCartKey(data.cartKey)
        });
    }
  };
  
  const CheckLoyalty = async () => {
    if (localStorage.getItem("loyalty_masegg") === null) {
      await axios
        .get(`${ip}/api/userLoyal`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} })
        .then(({ data }) => {
          console.log(data);

            localStorage.setItem("loyalty_masegg", data.data )
          if(localStorage.getItem('loyalty_masegg')=="Congratulations for being customer of the mounth, contact this email : admin@oneforall.com"){
           setOpen(true)
          }
          // setProducts(data.data)}
          // setData(data)
        });
    }
  };
  useEffect(() => {
    createCart();
  }, []);
  useEffect(() => {
    CheckLoyalty();
  }, []);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    fetcheFeature();
    }, [])
    const fetcheFeature = async () => {
      await axios.get(`${ip}/api/featured`).then(({ data }) =>
      {

        // console.log(data)
        setProducts(data)
        // console.log("hihihihihihihihihihihihihihiMotherFoucker")
      })}
     
  return (
    <div>
      <NavBar cartItems={cartItems} wishItems={wishItems} />
      <Announcement />
      <Slider />

      <SmlCtgCrds />
      <ActionButton2 />
      <CategoryCard />
      {/* <ActionButton/> */}
      <h1 className="ti">Featured Products</h1>

      <ProductsFeatured products={products} onAddWish={onAddWish}  onAdd={onAdd}  />
      <Snackbar onClose={handleClose} open={open}  >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Congratulations for being customer of the mounth, contact this email : admin@oneforall.com
        </Alert>
      </Snackbar>

      <Footer />
     
    </div>
  );
}
