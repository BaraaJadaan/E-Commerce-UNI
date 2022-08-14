import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
import "../Styles/InfoProfile.css";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
const EditProfile = ({accessToken,info}) => {
  const {search,ip} = useContext(AuthContext)

  const navigate = useNavigate();
  const [name, setName] = useState(`${info.name}`)
  const [email, setEmail] = useState(`${info.email}`)
  const [baio, setBaio] = useState(`${info.baio}`)
  const [phone, setPhone] = useState(`${info.phone_number}`)
  const [image, setImage] = useState(null)
  
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
};
const changeHandler = (e) => {
  setImage(e.target.files[0]);
  console.log(e.target.files[0]);
};
  const updateProfile = async (e) => {
    e.preventDefault();
    // const {namee,email,phone_number,baio,imagee}= {info}
    const formData = new FormData();
    // formData.append('_method', 'PATCH')

    formData.append('name', name)
    formData.append('baio', baio)
    formData.append('phone_number', phone)
    formData.append('email', email)

      // setImage(`${info.profile_photo}`)
      console.log(image) 
      if (image !== null) {
        formData.append('profile_photo', image)
        }

    await axios.post(`${ip}/api/profile/update-profile` , formData,config)
    .then(({ data }) => {
    console.log(data.message)
    window.location.reload()

    // navigate('/MyProfile')
    }).catch(({ response }) => {
    if (response.status == 422) {
    console.log(response.data.errors)
    } else {
    console.log(response.data.message)
    }
    })}
  return (
    <div className="userEdit">
        <div className="userTitleContainer">
         <div className="userUpdate">
    <span className="userUpdateTitle">Edit</span>
    <form className="userUpdateForm">
      <div className="userUpdateLeft">
        <div className="userUpdateItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="annabeck99"
            className="userUpdateInput"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        
        <div className="userUpdateItem">
          <label>Email</label>
          <input
            type="text"
            placeholder="annabeck99@gmail.com"
            className="userUpdateInput"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="userUpdateItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="+1 123 456 67"
            className="userUpdateInput"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className="userUpdateItem">
          <label>Baio</label>
          <input
            type="text"
            placeholder="I am Software Engener"
            className="userUpdateInput"
            onChange={(e) => setBaio(e.target.value)}
            value={baio}
          />
        </div>
      </div>
      <div className="userUpdateRight">
        <div className="userUpdateUpload">
          <img
            className="userUpdateImg"
            src={`${ip}/storage/profile_images/${info.profile_photo}`}    
                    alt=""
          />
          <label htmlFor="file">
            <Publish className="userUpdateIcon" />
          </label>
          <input type="file"  onChange={changeHandler}  id="file" style={{ display: "none" }} />
        </div>
        <button onClick={updateProfile} className="userUpdateButton">Update</button>
      </div>
    </form>
  </div>
  </div>
  </div>
  )
}

export default EditProfile