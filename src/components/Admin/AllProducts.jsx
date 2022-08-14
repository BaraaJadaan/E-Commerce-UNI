import "../Styles/AllProducts.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';import { productRows } from "./data";
import { Link } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
// import { Tooltip } from "recharts";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function AllProducts() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const {search,ip} = useContext(AuthContext)

  const handleDelete = async(id) => {
    // e.preventDefault();
    setData(data.filter((item) => item.id !== id));
    
    await axios
    .delete(`${ip}/api/admin/products/${id}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} }

    ).then(({data})=>{
        // console.log(data)
        window.location.reload()

    }).catch(({ response }) => {
      console.log(response);
    })
  };
  const handleFeatured = async(id)=>{
    // event.preventDefault();
    const formData = new FormData();
    // formData.append('_method', 'PATCH')

    formData.append('product_id', id)
    // formData.append('quantity', 1)
    // formData.append('product_id', )
    await axios
    .post(`${ip}/api/featured`,formData, {
      headers: {
        Authorization: ` Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(({data})=>{
        console.log(data)
        setOpen(true)
    }).catch(({ response }) => {
      console.log(response);
    })

  }

  useEffect(() => {
    fetchProducts();
    }, [])
    const fetchProducts = async () => {
      await axios.get(`${ip}/api/admin/productsAll`,
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} }).then(({ data }) =>
      {

        //  console.log(data)
        // setProducts(data.data)}
        setData(data)
      })}
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <Link to={`/DetailsProducts/${params.row.id}`}>

          <div className="productListItem">
            <img className="productListImg" src={`${ip}/storage/product_images/${params.row.image_url} `}alt="" />
            {params.row.name}
          </div>
          </Link>
        );
      },
    },
    { field: "quantity", headerName: "Quantity", width: 100 },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "user_id",
      headerName: "User_id",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            
            <DeleteRoundedIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
             <Tooltip title="Add To Featured">
             <AddCircleRoundedIcon
              className="productListAdd"
              onClick={() => handleFeatured(params.row.id)}
            />
            </Tooltip>
            
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
       <Snackbar onClose={handleClose} open={open}  >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Its Been In Added.
        </Alert>
      </Snackbar>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}