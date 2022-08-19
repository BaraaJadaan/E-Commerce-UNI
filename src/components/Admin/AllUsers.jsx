import "../Styles/AllUsers.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Link } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Send } from "@material-ui/icons";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
import Avatar from '@mui/material/Avatar';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const InputContainer = styled.div`
 background-color: #f1f1f1;
   display: flex;
  justify-content: center;
  align-items: center;
  border-radius:50%;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  padding: 6px;
`;
const Select = styled.select`
  padding: 10px;
  background-color: #f1f1f1; 
  font-weight: 500;
`;
const Option = styled.option``;
export default function AllUsers() {
  const [data, setData] = useState([]);
  const [value,setValue] = useState("")
  const [open, setOpen] = useState(false);
  const {search,ip} = useContext(AuthContext)


  const handleDelete = async (id) => {
    await axios
      .delete(`${ip}/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(({ data }) => {
        window.location.reload();
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const handleSendMoney = async (id) => {
    await axios
      .post(`${ip}/api/adminMoney?user=${id}&send=${value}`)
      .then(({ data }) => {
        setOpen(true);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get(`${ip}/api/admin/usersAll`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(({ data }) => {
        setData(data);
      });
  };

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
              <Avatar
                className="userListImg"
                src={`${ip}/storage/profile_images/${params.row.profile_photo} `}
                alt={params.row.name}
              />
              {params.row.name}
            </div>
          </Link>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "user_type",
      headerName: "UserType",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <DeleteRoundedIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
    {
      field: "sendMoney",
      headerName: "SendMoney",
      width: 250,
      renderCell: (params) => {
        return (
          <>
          <InputContainer>
            <div className="div">
            <Select onChange={(e)=>setValue(e.target.value)}>
              <Option selected>1000</Option>
              <Option>4500</Option>
              <Option>10000</Option>
            </Select>
            </div>
            <Button>
              <Send onClick={() =>handleSendMoney(params.row.id)}/>
            </Button>
          </InputContainer>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Snackbar onClose={handleClose} open={open}  >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Done Sending.
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
