import "../Styles/AllUsers.css";
import { DataGrid } from "@mui/x-data-grid";
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';import { userRows } from "./data";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
export default function Report() {
  const [data, setData] = useState([]);
  const {search,ip} = useContext(AuthContext)

  const handleDeleteProducts = async (id) => {
    // console.log(.user_type);
    // setData(data.filter((item) => (item.id !== id&&item.user_type !== type)));
    await axios
    .delete(`${ip}/api/admin/products/${id}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} }

    ).then(({data})=>{
        // console.log(data)
        window.location.reload()

    }).catch(({ response }) => {
      console.log(response);
    })
  };
  const handleDeleteUsers = async(id) => {
    // console.log(.user_type);
    // setData(data.filter((item) => (item.id !== id&&item.user_type !== type)));
    await axios
    .delete(`${ip}/api/admin/users/${id}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} }

    ).then(({data})=>{
        // console.log(data)
        window.location.reload()

    }).catch(({ response }) => {
      console.log(response);
    })
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    await axios
      .get(`${ip}/api/report`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        // setProducts(data.data)}
        setData(data);
      });
  };

  const columns = [
    { field: "id", headerName: "Id_User  ", width: 100 },

    {
      field: "user",
      headerName: "User whos report",
      width: 250,
      renderCell: (params) => {
        return (
          <Link to={`/MyProfile/${params.row.user.id}`}>
            <div className="userListUser">
              <img
                className="userListImg"
                src={`${ip}/storage/profile_images/${params.row.user.profile_photo} `}
                alt=""
              />
              {params.row.user.name}
            </div>
          </Link>
        );
      },
    },
    {
      field: "products",
      headerName: "Offending Products",
      width: 250,
      renderCell: (params) => {
        return (
          <Link to={`/DetailsProducts/${params.row.product.id}`}>
            <div className="userListUser">
              <img
                className="userListImg"
                src={`${ip}/storage/product_images/${params.row.product.image_url} `}
                alt=""
              />
              {params.row.product.name}
            </div>
          </Link>
        );
      },
    },
    {
      field: "category_id",
      headerName: "Category_id",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="div">
            {/* // <img className="userListImg" src={`${ip}/storage/product_images/${params.row.product.image_url} `} alt="" /> */}
            {params.row.product.category_id}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
             <Tooltip title="Delete Products">
            <RemoveShoppingCartRoundedIcon
              className="userListDelete"
              onClick={() => handleDeleteProducts(params.row.product.id)}
            />
            </Tooltip>
            <Tooltip title="Give him prize">
              <PersonRemoveRoundedIcon
                className="userListPrize"
                onClick={() => handleDeleteUsers(params.row.user.id)}
              /> 
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
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
