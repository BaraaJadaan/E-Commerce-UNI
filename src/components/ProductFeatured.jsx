import styled from "styled-components";
import "./Styles/Product.css";
import Rating from "@mui/material/Rating";
import { forwardRef, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { popularProducts } from "./data";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import { teal } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
const theme = createTheme({
  palette: {
    success: {
      main: teal[700],
    },
  },
});

const Info = styled.div`
  position: relative;
  opacity: 0;
  transition: all 0.5s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:10px;
`;

const WishIcon = styled.div`
  width: 40px;
  height: 40px;
  opacity: 0;
  z-index: 9;
  position: absolute;
  top: 8px;
  left: 8px;
  color: gray;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  &:hover ${Info} {
    opacity: 1;
  }
  &:hover ${WishIcon} {
    background-color: #e9f5f5;

    opacity: 1;
  }
  position: relative;
`;

const WrappName = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled.span`
  font-weight: 300;
  font-size: 25px;
  margin-left: 6px;
`;
const Price = styled.span`
  font-weight: 500;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
const RatingStyle = styled.div`
  display: flex;
  align-items: center;
`;
const Counter = styled.p`
  font-weight: 200px;
`;
const IconsWrapper = styled.div`
  position: absolute;
  right: 5px;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles((theme) => ({
  snackbar: {
    width: "100%",

    // marginRight: '100px'
    //  height: '20%',
  },
}));

const ProductFeatured = ({ item, onAdd, onAddWish }) => {
  const {search,ip} = useContext(AuthContext)

  const [value, setValue] = useState(2);
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [cartKey, setCartKey] = useState("");
  // const [accessToken, setAccessToken] = useState("")

  const classes = useStyles();
  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addToCart = async (e) => {
    e.preventDefault();

        const formData = new FormData();
      // formData.append('_method', 'PATCH')
  
      formData.append('cartKey', localStorage.getItem('cartKey'))
      formData.append('quantity', 1)
      // formData.append('product_id', )
      await axios
      .post(`${ip}/api/cart/products/${item.products[0].id}`, formData, {
        headers: {
          Authorization: ` Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then(({data})=>{
          console.log(data)
      }).catch(({ response }) => {
        console.log(response);
      })
    
  };
  const addToWishList = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('_method', 'PATCH')

    formData.append('product_id', `${item.products[0].id}`)
    // formData.append('quantity', 1)
    // formData.append('product_id', )
    await axios
    .post(`${ip}/api/wishlist`,formData, {
      headers: {
        Authorization: ` Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(({data})=>{
        console.log(data)
    }).catch(({ response }) => {
      console.log(response);
    })
  
  }
  // console.log(cartKey);
  return (  
    <ThemeProvider theme={theme}>
      <Container>
        <div className="wrapper">
          <div className="container">
            <Tooltip TransitionComponent={Zoom} title="Add to Wishlist">
              <WishIcon onClick={handleClick(TransitionDown)}>
                <div onClick={addToWishList}>
                <FavoriteBorderIcon
                  sx={{ width: "40px", height: "35px" }}
                  onClick={() => onAddWish(item)}
                />
                </div>
              </WishIcon>
            </Tooltip>
            
            <div className="top">
            <Link to={`/DetailsProducts/${item.products[0].id}`}>
              <img
                className="img"
                src={`${ip}/storage/product_images/${item.products[0].image_url}`}
              />
              </Link>
            </div>
            <div className="bottom">
              <Info>
                <WrappName>
                  <Name>{item.products[0].name}</Name>
                
                   
                </WrappName>
                <IconsWrapper onClick={handleClick(TransitionDown)}>
                  <Icon onClick={addToCart} >
                    <ShoppingCartCheckoutOutlined onClick={() => onAdd(item)} />
                  </Icon>
                </IconsWrapper>
              </Info>
              <Snackbar
                className={classes.snackbar}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                TransitionComponent={transition}
              >
                <Alert onClose={handleClose}>Its now in your bag</Alert>
              </Snackbar>
            </div>
          </div>
          <div class="inside">
            <div class="icon">
              <i class="material-icons">info</i>
            </div>
            <div class="contents">
              <Price>Price :{item.products[0].price}$</Price>
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default ProductFeatured;
