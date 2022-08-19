import styled from "styled-components";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import React, { useState, useEffect, useContext } from "react";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from '@mui/icons-material/Flag';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AuthContext   from "../hooks/AuthProvider";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  min-height: 100vh;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  max-height: 100%;
    max-width: 100%;
    transform: translate(-50px, 0px);
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  
  font-size: 45px;
 
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-weight: 900;
  font-size: large;
  
`;

const Price = styled.span`
  margin-left:5px;
  font-weight: 900;
  font-size: 40px;
  color: #bc0000;
  margin-top:20px;
`;

const Quantity = styled.span`
font-weight: 900;
font-size: 20px;
transform: translate(0px, 13px);
color: #006d40;
margin-top:23px;
`;

const Colored = styled.span`
font-weight: 100;
font-size: 20px;
border-radius: 40px;
padding: 10px 10px;
background-color: indigo;
color: white;
cursor: pointer;
`;

const FilterContainer = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Date = styled.p`
margin-left: 7px;  
font-weight: 900;
font-size: 16px;
transform: translate(0px, 13px);
`;
const WrapperIcons = styled.div`
    position: relative;
    left: 1100px;
    bottom: 3.5px;
`
const Product = () => {
  const {ip} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openSnack2, setOpenSnack2] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(true)
  const [openReview, setOpenReview] = useState(false)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("")
  const navigate = useNavigate();
  const { id } = useParams();
  const [Id, setId] = useState('')
  const [user_id, setUser_id] = useState('')
  const [created_at, setCreated_at] = useState('')
  const [newStar, setNewStar] = useState("")
  const [comment, setComment] = useState('')
  const [avatar, setAvatar] = useState(null);
  const [sellerName, setSellerName] = useState("");
  const [reviews, setReviews] = useState([])
  const [userType, setUserType] = useState('')
  const [accessToken, setAccessToken] = useState("")
  const [userId, setUserID] = useState("")
  const [userName, setUserName] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [Avg, setAvg] = useState()
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
};
 useEffect(()=>{
  const data1 = localStorage.getItem('accessToken')
  const data2 = localStorage.getItem('userID')
  const data3 = localStorage.getItem('userName')
  if(data1!==null){setAccessToken(data1)}
  if(data2!==null){setUserID(data2)}
  if(data3!==null){setUserName(data3)}
  },[])


  const fetchAll = async () => {
    await axios
      .get(`${ip}/api/products/${id}/reviews`,{ headers: {"Authorization" :` Bearer ${localStorage.getItem('accessToken')}`} })
      .then(({ data }) => {
        const {product, review_avg} = data;
        setImage(product.image_url);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setAvg(review_avg);
        setCreated_at(product.created_at);
        setUser_id(product.user_id)
        setId(product.id)
        setUserType(product.user.user_type)
        setAvatar(product.user.profile_photo);
        setSellerName(product.user.name);
        setReviews(product.reviews)
        setIsPending(false)
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
        console.log(data);
      });
  }; 

  useEffect(() => {
    fetchAll();
  });


  const changeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    await axios
      .post(`${ip}/api/products/`+ id, formData, config)
      .then(({ data }) => {
        console.log(data.message);
        setOpen(false);
        Window.local.reload();
      })
      .catch(({ response }) => {
        if (response.status == 422) {
          console.log(response.data.errors);
        } else {
          console.log(response.data.message);
        }
      });
  };

  const deleteProduct = async () => {
    await axios.delete(`${ip}/api/products/${id}`, config)
    .then(({ data }) => {
    navigate("/");
    }).catch(({ response: { data } }) => {
    console.log(data.message)
    })
    }

    const addToCart = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('cartKey', localStorage.getItem('cartKey'))
        formData.append('quantity', 1)
        await axios
        .post(`${ip}/api/cart/products/${id}`, formData, config).then(({data})=>{
            console.log(data)
        }).catch(({ response }) => {
          console.log(response);
        })
      
    };
    const sendToAdmin = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('price', price)
        formData.append('id', Id)
        await axios
        .post(`${ip}/api/send/?product_id=${Id}&send=${price}`, formData, config)
        .then(({data})=>{
          setOpenSnack2(true)
        }).catch(({ response }) => {
          setOpenSnack(true);
        })
      
    };
 
  const showColored = () => {
    if (user_id==userId)
      return true;
  }

  const isSold = () => {
    if (quantity==0)
    return true;
  }
  const userToAdmin = () => {
    if (user_id==1)
    return true;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
    setOpenSnack2(false);
  };

  const reportProduct = async(e) =>   {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_id', id);
    await axios
      .post(`${ip}/api/report`, formData, config)
      .then(({ data }) => {
        console.log(data.message);
      })
      .catch(({ response }) => {
        if (response.status == 422) {
          console.log(response.data.errors);
        } else {
          console.log(response.data.message);
        }
      });
  }

  const postComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("review", comment);
    formData.append("star", newStar);
    await axios
      .post(`${ip}/api/products/${id}/reviews`, formData, config)
      .then(({ data }) => {
        setOpenReview(false);
        // Window.local.reload();
      })
      .catch(({ response }) => {
        if (response.status == 422) {
          console.log(response.data.errors);
        } else {
          console.log(response.data.message);
        }
      });
  };

  // useEffect(() => {

  //   const interval = setInterval(() => {
  //       // Poll the server for new data.
  //       fetch(`${ip}/api/products/${id}/reviews`)
  //       .then(res => res.json())
  //       .then(
  //         (result) => {
  //           setIsLoaded(true);
  //           setData(result);
  //         },
  //         (error) => {
  //           setIsLoaded(true);
  //           setError(error);
  //         }
  //       )
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  
  return (
    <>
      {image&&<div>
      <Wrapper>
        <div style={{}}>
             { showColored() &&<WrapperIcons>
              <Tooltip
                onClick={() => setOpen(true)}
                TransitionComponent={Zoom}
                title="Edit Product"
              >
                <Colored
                  style={{
                    backgroundColor: "#f79f06",
                    }}>
                  <EditIcon style={{ transform: "translate(0px, 5px)" }} />
                </Colored>
              </Tooltip>
              <Tooltip onClick = {deleteProduct} TransitionComponent={Zoom} title="Delete Product">
                <Colored style={{position: 'relative', left: '10px',backgroundColor: "#a31d0b" }}>
                  <DeleteIcon style={{ transform: "translate(0px, 5px)" }} />
                </Colored>
              </Tooltip>
              </WrapperIcons>}
              
              {!showColored() && <Tooltip  onClick = {reportProduct} TransitionComponent={Zoom} title="Report Product">
                <Colored style={{ position: 'relative',left: '1208px',bottom: '35px',backgroundColor: "#312f2e" }}>
                  <FlagIcon style={{ transform: "translate(0px, 5px)" }} />
                </Colored>
              </Tooltip>}
            </div>
            {isPending && <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openBackdrop}
            >
            {/* <MutatingDots 
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor= '#4fa94d'
              radius='12.5'
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /> */}
          </Backdrop>}
        <Modal open={open}>
          <Container
            style={{
              width: 500,
              height: 350,
              borderRadius: "20px",
              backgroundColor: "white",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: "auto",
            }}
          >
            <form onSubmit={updateProduct} autoComplete="off" style={{}}>
              <div style={{ margin: 10 }}>
                <h2 style={{ fontSize: "large" }}>
                  Update the product's information:
                </h2>
                <TextField
                  type="text"
                  id="standard-basic"
                  label="name"
                  size="small"
                  onChange={(e) => setName(e.target.value)}
                  
                  color="secondary"
                  // required
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ margin: 10 }}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  type="text"
                  variant="outlined"
                  label="Description"
                  size="small"
                  onChange={(e) => setDescription(e.target.value)}
                  color="secondary"
                  style={{ width: "100%" }}
                />
              </div>
              
              <div style={{ display: "flex", margin: 10 }} >
              <TextField
                id="standard-static"
                variant="outlined"
                label="Price"
                size="small"
                onChange={(e) => setPrice(e.target.value)}
                color="secondary"
                style={{ width: "50%", marginRight: 20 }}
              />
              <TextField
                id="standard-static"
                variant="outlined"
                label="Quantity"
                size="small"
                onChange={(e) => setQuantity(e.target.value)}
                color="secondary"
                style={{ width: "50%", }}
              />
              
              </div>
              <div style={{ marginLeft: 100 }}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 50, borderRadius: "20px" }}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ borderRadius: "20px" }}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Container>
        </Modal>
        <ImgContainer>
          {isSold() && <Colored style={{position: 'absolute',transform: "translate(-80px, -30px)",padding: "0px 7px",backgroundColor: '#033bb4'}}>
              <h4 style={{transform: "translate(0px, -3px)"}}>
                Sold Out
              </h4>
            </Colored>}
          <Image src={`${ip}/storage/product_images/${image}`} />
        </ImgContainer>
        <InfoContainer>
          <div style={{ display: 'flex', alignContent: 'center' }} >
            <Title>{name}</Title>
          </div>
          <Desc>
            {description}
          </Desc>
          <Tooltip TransitionComponent={Zoom} title="Click to Submit a Review">
            <Rating
              precision={0.5}
              value={newStar}
              onChange={(event, star) => {
                // handleReview(star);
                setNewStar(star);
              }}
              onClick={() => setOpenReview(true)}
              style={{ paddingTop: "7px", position: "absolute" }}
            />
          </Tooltip>
          <h3
            style={{
              position: "relative",
              transform: "translate(130px, 10px)",
            }}
          >
            {Avg}
          </h3>
        <Modal open={openReview}>
          <Container
            style={{
              width: 500,
              height: 300,
              borderRadius: "20px",
              backgroundColor: "white",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: "auto",
            }}
          >
          <form onSubmit={postComment} autoComplete="off" style={{}}>
              <div style={{ margin: 10 }}>
                <h2 style={{ fontSize: "large", marginTop: 30 }}>
                  Submit Your Review:
                </h2>
                <div style={{}}>
                <Rating
                  precision={0.5}
                  value={newStar}
                  onChange={(event, star) => {
                    // handleReview(star);
                    setNewStar(star);
                  }}
                  style={{marginLeft: '35%'}}
                />
                </div>
                <div style={{ margin: 10 }}>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    type="text"
                    variant="outlined"
                    label="Your Comment..."
                    size="small"
                    onChange={(e) => setComment(e.target.value)}
                    color="secondary"
                    // required
                    style={{ width: "100%" }}
                  />
              <div style={{marginTop: 30, marginLeft: 85 }}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 50, borderRadius: "20px" }}
                >
                  Post
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ borderRadius: "20px" }}
                  onClick={() => setOpenReview(false)}
                >
                  Cancel
                </Button>
              </div>
              </div>
              </div>
            </form>
          </Container>
        </Modal>
          <FilterContainer>
            <Price>${price}</Price>
            {!isSold() && <Quantity>({quantity} items left)</Quantity>}
          </FilterContainer>
          {!userToAdmin() && <Tooltip onClick={addToCart} TransitionComponent={Zoom} title="Add to Cart">
            <Colored style={{ paddingRight: "10px" }}>
              Add item to <ShoppingCartRoundedIcon
                style={{ transform: "translate(0px, 5px)" }}
              />
            </Colored>
          </Tooltip>}
          {userToAdmin() && <Tooltip onClick={sendToAdmin} TransitionComponent={Zoom} title="Purchase">
            <Colored style={{ padding: "10px 20px" }}>
              <PaidRoundedIcon
                style={{ transform: "translate(0px, 5px)" }}
              />
            </Colored>
          </Tooltip>}
          <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
            YOU DONT HAVE ENOUGH POINTS
            </Alert>
          </Snackbar>
          <Snackbar open={openSnack2} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Points Sent Succesefully
            </Alert>
          </Snackbar>
          <Date>Create Date: {created_at.split("T",1)}</Date>
        </InfoContainer>
      </Wrapper>

      <Grid container spacing={2}>
      <Grid item xs={3}>
      <Accordion true style={{margin: '6px', backgroundColor:'#ffffff50', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)',}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}>
          <h1>Seller's Information</h1>
        </AccordionSummary>
          <AccordionDetails>
            <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center'  }} to={`/MyProfile/${user_id}`}>
              <Avatar style={{}} alt={sellerName} src={`${ip}/storage/profile_images/${avatar}`} />
              <h1 style={{transform: 'translate(20px, 0px)'}}>{sellerName}</h1>
            </Link>
          </AccordionDetails>
      </Accordion>
      </Grid>
    <Grid item xs={9}>
      <Accordion true style={{margin: '6px', backgroundColor:'#ffffff50', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)',}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}>
          <h1>Comment Section</h1>
        </AccordionSummary>
          <AccordionDetails>
            {reviews.map((item) => (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center',  }} to={`/MyProfile/${item.user_id}`}>
                  <Avatar style={{}} alt={item.user.name} src={`${ip}/storage/profile_images/${item.user.profile_photo}`} />
                  <h1 style={{transform: 'translate(40px, 0px)'}}>{item.user.name}</h1>
                </Link>
                <Rating
                      precision={0.5}
                      value={item.star}
                      readOnly
                      style={{marginLeft: '35%'}}
                  />
              </div>
              <h1>{item.review}</h1>
              <Divider style={{}} />
            </div>
            ))}
          </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
    </div>}
    </>
  );
};

export default Product;
