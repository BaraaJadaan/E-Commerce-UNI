import "../Styles/AllUsers.css";
import { DataGrid } from '@mui/x-data-grid';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import { Link } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Tooltip } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Loyalty() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const {search,ip} = useContext(AuthContext)

 
  
  useEffect(() => {
    fetchUsers();
    }, [])
    const fetchUsers = async () => {
      await axios.get(`${ip}/api/mostuser/`).then(({ data }) =>
      {

         console.log(data)
        // setProducts(data.data)}
        setData(data)
      })}

      const handleLoylty = async(id)=>{
        // event.preventDefault();
        const formData = new FormData();
        // formData.append('_method', 'PATCH')
    
        formData.append('user_id', id)
        // formData.append('quantity', 1)
        // formData.append('product_id', )
        await axios
        .post(`${ip}/api/loyalty`,formData, {
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
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <Link to={`/MyProfile/${params.row.id}`}>

          <div className="userListUser">
            <Avatar className="userListImg" src={`${ip}/storage/profile_images/${params.row.profile_photo} `} 
            alt={params.row.name} />
            {params.row.name}
          </div>
          </Link>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "products_count",
      headerName: "Products Count",
      width: 120,
    },

    {
      field: "action",
      headerName: "Action",
      width: 60,
      renderCell: (params) => {
        return (
          <>
           
           
            <Tooltip title="Give him prize">

             <VolunteerActivismRoundedIcon
              className="userListPrize"
              onClick={() => handleLoylty(params.row.id)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
       <Snackbar onClose={handleClose} open={open}  >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          1000 Points has Been Sent.
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