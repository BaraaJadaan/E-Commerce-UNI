import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import "../Styles/InfoProfile.css";
  import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
 
  import AuthContext   from "../../hooks/AuthProvider";
  import { useContext } from "react";

  export default function InfoProfile({info,id}) {
    const {search,ip} = useContext(AuthContext)

    const [money, setMoney] = useState({})
    useEffect(() => {
      getMoney();
      }, [])
      const getMoney = async () => {
        await axios.get(`${ip}/api/seemoney`,{ headers: {"Authorization" :` Bearer ${localStorage.getItem('accessToken')}`} }).then(({ data }) =>
        {
            console.log(data)

          // console.log(localStorage.getItem('userType'))
          setMoney(data)
          // console.log("hihihihihihihihihihihihihihiMotherFoucker")
        })}
    return (
      <div className="user">
        <div className="userTitleContainer">
        {!id &&  <h1 className="userTitle">My Info</h1>}
         
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
              src={`${ip}/storage/profile_images/${info.profile_photo}`}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{info.name}</span>
                <span className="userShowUserTitle">{info.baio}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{info.name}</span>
              </div>
              
              {!id && <div className="userShowInfo">
                <AttachMoneyRoundedIcon className="userShowIcon" />
                <span className="userShowInfoTitle">{money.balance} p</span>
              </div>}
            
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{info.created_at.split("T",1)}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{info.phone_number}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{info.email}</span>
              </div>
             
            </div>
          </div>
         
        </div>
      </div>
    );
  }