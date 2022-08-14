import "../Styles/WidgetUser.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
export default function WidgetUser() {
  const {search,ip} = useContext(AuthContext)

  const [data, setData] = useState([])
  useEffect(() => {
    fetchfewUser();
    }, [])
    const fetchfewUser = async () => {
      await axios.get(`${ip}/api/admin/lastuser`,
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} }).then(({ data }) =>
      {

          console.log(data)
        // setProducts(data.data)}
        setData(data)
      })}
  return (
    
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      {data.map((item)=>(
       < ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src={`${ip}/storage/profile_images/${item.profile_photo} `}

            alt=""
            className="widgetSmImg"
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