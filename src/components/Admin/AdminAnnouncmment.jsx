import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
import axios from "axios";
const theme = createTheme({
  palette: {
    success: {
      main: teal[700],
    },
    secondary:{
      main: '#4B0082'
    }
  },
});
const Container = styled.div`
  flex: 5;
  /* flex-direction:column; */
  margin-top: 10px;
  font-size: large;
  font-weight: bold;
`;

const Title = styled.span`
  position: absolute;
  left: 6%;
  margin-bottom: 15px;
`;
const WrraperCenter = styled.div`
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Div = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AdminAnnouncmment = () => {
  const [data, setData] = useState("")
  const {search,ip} = useContext(AuthContext)


  const updateAnnouncmment = async (e) => {
    e.preventDefault();
    // const {namee,email,phone_number,baio,imagee}= {info}
    const formData = new FormData();
    // formData.append('_method', 'PATCH')

    formData.append('announcmment', data)
    

      // setImage(`${info.profile_photo}`)
     

    await axios.post(`${ip}/api/announcmment`, formData)
    .then(({ data }) => {
    console.log(data)
    
    window.location.reload()

    // navigate('/MyProfile')
    }).catch(({ response }) => {
   
    })}
  return (
    <ThemeProvider theme={theme}>

    <Container>
      <WrraperCenter>
        <Title>Type Your Announcment to publish to all users</Title>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 4, width: "70ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
          color="secondary"
          
            autoFocus="true"
            id="outlined-basic"
            label="Type Announcmment "
            variant="outlined"
            onChange={(e) => setData(e.target.value)}
                value={data}
          />
        </Box>
        <Div>
          <Button onClick={updateAnnouncmment} color="success" variant="contained">Publish</Button>
        </Div>
      </WrraperCenter>
    </Container>
    </ThemeProvider>
  );
};

export default AdminAnnouncmment;
