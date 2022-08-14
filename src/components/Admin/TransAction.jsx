import "../Styles/AllProducts.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';import { productRows } from "./data";
import { Link } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
// import { Tooltip } from "recharts";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
export default function TransAction() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const {search,ip} = useContext(AuthContext)

  
  

  useEffect(() => {
    fetchProducts();
    }, [])
    const fetchProducts = async () => {
      await axios.get('http://127.0.0.1:8000/api/admin/productsAll',
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} }).then(({ data }) =>
      {

        //  console.log(data)
        // setProducts(data.data)}
        // setData(data)
      })}
    
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <Link to={`/DetailsProducts/${params.row.product.id}`}>

          <div className="productListItem">
            <img className="productListImg" src={`http://127.0.0.1:8000/storage/product_images/${params.row.product.image_url} `}alt="" />
            {params.row.product.name}
          </div>
          </Link>
        );
      },
    },
    {
        field: "user",
        headerName: "Customer",
        width: 250,
        renderCell: (params) => {
          return (
            <Link to={`/MyProfile/${params.row.account.user_id}`}>
  
            <div className="productListItem">
              <img className="productListImg" src={`http://127.0.0.1:8000/storage/profile_images/${params.row.account.user.profile_photo} `}alt="" />
              {params.row.account.user.name}
            </div>
            </Link>
          );
        },
      },
      {
        field: "user",
        headerName: "Customer",
        width: 250,
        renderCell: (params) => {
          return (
            <Link to={`/MyProfile/${params.row.account.user_id}`}>
  
            <div className="productListItem">
              <img className="productListImg" src={`http://127.0.0.1:8000/storage/profile_images/${params.row.account.user.profile_photo} `}alt="" />
              {params.row.account.user.name}
            </div>
            </Link>
          );
        },
      },
      {
        field: "emile",
        headerName: "Email",
        width: 250,
        renderCell: (params) => {
          return (
            <Link to={`/MyProfile/${params.row.account.user_id}`}>
  
            <div className="productListItem">
              {}
            </div>
            </Link>
          );
        },
      },
       {
      field: "user_id",
      headerName: "User_id",
      width: 160,
    },
    { field: "operation", headerName: "Price", width: 100 },
   
    {
      field: "user_id",
      headerName: "User_id",
      width: 160,
    },
    
  ];

  return (
    <div className="productList">
      
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