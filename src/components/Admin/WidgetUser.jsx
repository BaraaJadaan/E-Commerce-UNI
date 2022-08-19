import "../Styles/WidgetUser.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
import { Avatar } from "@mui/material";


export default function WidgetUser() {
  const {search,ip} = useContext(AuthContext)

  const [data, setData] = useState([])
  useEffect(() => {
    fetchfewUser();
    }, [])

    const fetchfewUser = async () => {
      await axios.get(`${ip}/api/admin/lastuser`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} })
      .then(({ data }) =>
      {
        setData(data)
      })}
  return (
    
    <div className="widgetSm">
      <span className="widgetSmTitle">Our Newest Members</span>
      {data.map((item)=>(
       < ul className="widgetSmList">
        <li className="widgetSmListItem">
          <Avatar
            src={`${ip}/storage/profile_images/${item.profile_photo} `}
            alt={item.name}
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{item.name}</span>
            <span className="widgetSmUserTitle"></span>
          </div>
        
          </li>
          </ul>
      ))}
     
    </div>
  );
}