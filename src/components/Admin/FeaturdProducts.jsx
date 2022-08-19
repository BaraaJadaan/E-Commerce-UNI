import "../Styles/AllProducts.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';import { productRows } from "./data";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
// import { Tooltip } from "recharts";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
export default function FeaturdProducts() {
  const [data, setData] = useState([]);
  const {search,ip} = useContext(AuthContext)

  const handleDelete = async(id) => {
    // e.preventDefault();
    setData(data.filter((item) => item.id !== id));
    
    await axios
    .delete(`${ip}/api/featured/${id}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} }

    ).then(({data})=>{
        console.log(data)
        window.location.reload()

    }).catch(({ response }) => {
      console.log(response);
    })
  };

  useEffect(() => {
    fetcheFeature();
    }, [])
    const fetcheFeature = async () => {
      await axios.get(`${ip}/api/featured`).then(({ data }) =>
      {
        
        setData(data)
        
      })}
      

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <Link to={`/DetailsProducts/${params.row.product_id}`}>

          <div className="productListItem">
            <img className="productListImg" src={`${ip}/storage/product_images/${params.row.products[0].image_url} `}alt="" />
            {params.row.products[0].name}
          </div>
          </Link>
        );
      },
    },
    { field: "quantity", headerName: "Quantity", width: 100,
    renderCell: (params) => {
      return (
       

        <div className="productListItem">
          {params.row.products[0].quantity}
        </div>
      
      );
    }, },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      renderCell: (params) => {
        return (
         
  
          <div className="productListItem">
            {params.row.products[0].price}
          </div>
       
        );
      },
    },
    {
      field: "user_id",
      headerName: "User_id",
      width: 160,
      renderCell: (params) => {
        return (
         
  
          <div className="productListItem">
            {params.row.products[0].user_id}
          </div>
          
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 60,
      renderCell: (params) => {
        return (
          <>
            <DeleteRoundedIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.product_id)}
            />
          </>
        );
      },
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