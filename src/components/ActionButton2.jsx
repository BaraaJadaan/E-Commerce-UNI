import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Autocomplete from "@mui/material/Autocomplete";
//  import ImageUp from "./ImageUp";
import { makeStyles } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { useState, useRef, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
// import NumberFormat from "react-number-format";
import { Categories } from "../Data";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    width: 500,
    height: 500,
    borderRadius: "20px",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    // [theme.breakpoints.down("sm")]: {
    //   width: "100vw",
    //   height: "100vh",
    // },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const ActionButton2 = () => {
  const {search,ip} = useContext(AuthContext)

  const classes = useStyles();
  const [values, setValues] = React.useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("")
  const [categories, setCategories] = useState(Categories[0]);
  const [categoryId, setCategoryId] = useState();
  const inputFile = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [accessToken, setAccessToken] = useState("")
  const [userId, setUserID] = useState("")
  const [userName, setUserName] = useState("")
  const [productId, setProductId] = useState('')

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
  })

  const changeHandler = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  };

  useEffect(() => {
   fetchProducts();
  }, [])
  const fetchProducts = async () => {
    await axios.get(`${ip}/api/admin/productsAll`).then(({ data }) =>
    {
      // console.log('sssssssssssssssss');
      setProductId(data[data.length-1].id)
       console.log(data)
    }
      )
    }
  
  const createProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
  
      formData.append("category_id", categoryId);
    formData.append("image_url", image);

    await axios
      .post(`${ip}/api/products`, formData, config)
      .then(({ data }) => {
        // <Link to={`/DetailsProducts/${item.id}`}>

          navigate(`/DetailsProducts/${productId+1}`);
      })
  };

console.log(categoryId);
  const onIconClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <>
      <Tooltip
        TransitionComponent={Zoom}
        title="Add Product"
        aria-label="add"
        onClick={() => setOpen(true)}
      >
        <Fab
          style={{ backgroundColor: "teal", color: "white" }}
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open}>
        <Container className={classes.container}>
          <form
            onSubmit={createProduct}
            className={classes.form}
            autoComplete="off"
          >
            <div className={classes.item}>
              <h2 style={{ fontSize: "large" }}>
                Enter the product's information:
              </h2>
              <TextField
                type="text"
                id="standard-basic"
                label="Title"
                size="small"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                type="text"
                variant="outlined"
                label="Description"
                size="small"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ display: "flex" }} className={classes.item}>
              <TextField
                id="standard-static"
                variant="outlined"
                label="Price"
                size="small"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                color="secondary"
                required
                style={{ width: "50%", marginRight: 20 }}
              />
              <TextField
                id="standard-static"
                variant="outlined"
                label="Quantity"
                size="small"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                color="secondary"
                style={{ width: "50%", }}
              />
              </div>
            <div className={classes.item}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Categories}
                getOptionLabel={(option) => option}
                value={categories}
                onChange={(e, categorye) => setCategoryId(parseInt(categorye.split("-", 1), 10))}
                style={{ width: "100%" }}
                renderInput={(param) => (
                  <TextField
                    {...param}
                    required
                    label="Categories"
                    size="small"
                  />
                )}
              />
            </div>
            
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
              className={classes.item}
            >
              <input type='file'  onChange={changeHandler} />
            </div>
            <div style={{ marginLeft: 90 }} className={classes.item}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                style={{ marginRight: 50, borderRadius: "20px" }}
                // onClick={() => setOpenAlert(true)}
              >
                Create
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
    </>
  );
};

export default ActionButton2;
