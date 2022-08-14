// import React from 'react'
// import { CommentSection } from 'react-comments-section'
// import 'react-comments-section/dist/index.css'
// import { useState, useEffect, useContext } from 'react'
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Avatar from '@mui/material/Avatar';
// import AuthContext   from "../hooks/AuthProvider";
// import axios from "axios";
// import { useNavigate, useParams, Link } from "react-router-dom";
// // const navigate = useNavigate();

// const Reviews = () => {
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState("");
//   const [text, setText] = useState('')
//   const [user_id, setUser_id] = useState('')
//   const { id } = useParams();
//   const {rating,setRating} = useContext(AuthContext)

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const [accessToken, setAccessToken] = useState("")
//   const [userId, setUserID] = useState("")
//   const [userName, setUserName] = useState("")

//   const config = {
//     headers: { Authorization: `Bearer ${accessToken}` }
//   };

//   const handleComment = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("review", text);
//     formData.append("star", rating);
//     await axios
//       .post(`http://127.0.0.1:8000/api/products/${id}/reviews`, formData, config)
//       .then(({ Cdata }) => {
//         console.log(Cdata.message);
//         // Window.local.reload();
//       })
//       .catch(({ response }) => {
//         if (response.status == 422) {
//           console.log(response.Cdata.errors);
//         } else {
//           console.log(response.Cdata.message);
//         }
//       });
//   };

//   const fetchProduct = async () => {
//     await axios
//       .get(`http://127.0.0.1:8000/api/products/${id}/reviews`, { headers: {"Authorization" :` Bearer ${localStorage.getItem('accessToken')}`} })
//       .then(({  data }) => {
//         const {user, user_id} = data[0];
//         setImage(user.profile_photo);
//         setName(user.name);
//         setUser_id(user_id)
//         // set()
        
//         // console.log(data[0].reviews[1])

//       })
//       .catch(({ response: { data } }) => {
//         console.log(data.message);
//       });
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={6}>
//       <Accordion true style={{margin: '6px', backgroundColor:'#ffffff50', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)',}}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}>
//           <h1>Seller's Information</h1>
//         </AccordionSummary>
//           <AccordionDetails>
//             <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center'  }} to={`/MyProfile/${user_id}`}>
//               <Avatar style={{}} alt={name} src={`http://127.0.0.1:8000/storage/profile_images/${image}`} />
//               <h1 style={{transform: 'translate(7px, 0px)'}}>{name}</h1>
//             </Link>
//           </AccordionDetails>
//       </Accordion>
//       </Grid>
//     <Grid item xs={6}>
//       <Accordion true style={{margin: '6px', backgroundColor:'#ffffff50', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)',}}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}>
//           <h1>Comment Section</h1>
//         </AccordionSummary>
//         <AccordionDetails>
//         <div>
//           <CommentSection
//           hrStyle={{ border: '0.5px solid teal' }}
//           titleStyle= {{ font: '300 11px/1.4 Helvetica Neue', fontSize: '30px', fontWeight: 'bold' }}
//           submitBtnStyle={{ border: '0px', backgroundColor: 'indigo' }}
//           inputStyle={{ border: '1px solid rgb(208 208 208)', margin :'0px 20px', borderRadius: '10px' }}
//           formStyle={{ backgroundColor: '#ffffff50' }}
//             currentUser={{
//               currentUserId: `${user_id}`,
//               currentUserImg:{image},
//               currentUserProfile:`/MyProfile/${user_id}`,
//               currentUserFullName: {name}
//             }}
//             // commentData={data[0].reviews.map((item)=>([item]))}
//             // logIn={{
//             //   loginLink: 'http://localhost:3000/Login',
//             //   signupLink: 'http://localhost:3000/Login'
//             // }}
//             onSubmitAction={handleComment()}
//             currentData={(commentData) => {
//               console.log('curent data', commentData)
//             }}
//           />
//         </div>
//         </AccordionDetails>
//       </Accordion>
//       </Grid>
//     </Grid>
//   )
// }

// export default Reviews