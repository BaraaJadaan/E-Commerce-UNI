import React from "react";
import "../Styles/SideBarPage.css";
import {
    Home,
 
    History,

    Storefront,
    MeetingRoom
} from "@material-ui/icons";
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
export default function SideBarAdmin ({home,product}) {
    const {search,ip} = useContext(AuthContext)

     const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
};
const navigate = useNavigate();
    const Logout = async (e)=>{
        e.preventDefault();
        await axios.post(`${ip}/api/logout` ,[], config)
        .then(({ data }) => {
        console.log(data)
        localStorage.clear();
        navigate("/Login")
    
        // navigate('/MyProfile')
        }).catch(({ response }) => {
        if (response.status == 422) {
        console.log(response);
        }})

    }
    return (
        <div className="SideBar">
            <div className="sideBarWrapper">
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">MyProfile</h3>
                    <ui className="sideBarList">
                 
                        <li className="sideBarItem active" onClick={home}>
                            <Home className="sidebarIcon" />
                            Home
                        </li>
                        
              
                        <li className="sideBarItem"  onClick={product}>
                            <Storefront className="sidebarIcon" />
                            MyProducts
                        </li>
                      
                        {localStorage.getItem('userType')=='ADM' && 
                        <Link to={"/Admin"}>
                         <li className="sideBarItem" >
                         <AdminPanelSettingsRoundedIcon className="sidebarIcon" />
                         Admin Page
                     </li>
                     </Link>
                        }
                        <li className="sideBarItem" onClick={Logout} >
                            <MeetingRoom className="sidebarIcon" />
                            LogOut
                        </li>
                    </ui>
                </div>
                {/* <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Quick Menu</h3>
                    <ui className="sideBarList">
                        <Link  to="/users" className="link">
                        <li className="sideBarItem ">
                            <PermIdentity className="sidebarIcon" />
                            Users
                        </li>
                        </Link>
                        <Link  to="/products" className="link">
                        <li className="sideBarItem">
                            <Storefront className="sidebarIcon" />
                            Products
                        </li>
                        </Link>
                        <li className="sideBarItem">
                            <AttachMoney className="sidebarIcon" />
                            Transactions
                        </li>
                    </ui>
                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Notifications</h3>
                    <ui className="sideBarList">
                        <li className="sideBarItem">
                            <BarChart className="sidebarIcon" />
                            mail
                        </li>
                        <li className="sideBarItem">
                            <MailOutline className="sidebarIcon" />
                            feedback
                        </li>
                        <li className="sideBarItem">
                            <DynamicFeed className="sidebarIcon" />
                            Messages
                        </li>
                    </ui>
                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Staff</h3>
                    <ui className="sideBarList">
                        <li className="sideBarItem">
                            <ChatBubbleOutline className="sidebarIcon" />
                            Mange
                        </li>
                        <li className="sideBarItem">
                            <WorkOutline className="sidebarIcon" />
                            Analystic
                        </li>
                        <li className="sideBarItem">
                            <Report className="sidebarIcon" />
                            Reports
                        </li>
                    </ui>
                </div> */}
            </div>
        </div>
    );
}
