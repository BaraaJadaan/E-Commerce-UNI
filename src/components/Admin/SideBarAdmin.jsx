import React from "react";
import "../Styles/SideBarPage.css";
import { Home, Group, Storefront, NotificationsNone } from "@material-ui/icons";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";
import { Link } from "react-router-dom";
import StoreMallDirectoryRoundedIcon from "@mui/icons-material/StoreMallDirectoryRounded";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AuthContext from "../../hooks/AuthProvider";
import { useContext } from "react";
export default function SideBarProfile({
  report,
  announcement,
  home,
  products,
  users,
  featurd,
  loyalty,
  trans,
}) {
  const {search,ip} = useContext(AuthContext)

  return (
    <div className="SideBar">
      <div className="sideBarWrapper">
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Home</h3>
          <ul className="sideBarList">
            <li className="sideBarItem active" onClick={home}>
              <Home className="sidebarIcon" />
              Home
            </li>
            <li className="sideBarItem" onClick={users}>
              <Group className="sidebarIcon" />
              Users
            </li>

            <li className="sideBarItem" onClick={products}>
              <Storefront className="sidebarIcon" />
              Products
            </li>
            <li className="sideBarItem" onClick={featurd}>
              <StoreMallDirectoryRoundedIcon className="sidebarIcon" />
              FeaturdProducts
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sideBarTitle">Notification</h3>
          <ul className="sideBarList">
            {/* <li className="sideBarItem" onClick={trans}>
              <PointOfSaleIcon className="sidebarIcon" />
              TransAction
            </li> */}
            <li className="sideBarItem" onClick={loyalty}>
              <CardGiftcardRoundedIcon className="sidebarIcon" />
              Lotalty Program
            </li>
            <li className="sideBarItem" onClick={announcement}>
              <NotificationsNone className="sidebarIcon" />
              Announcmment
            </li>
            <li className="sideBarItem" onClick={report}>
              <FlagRoundedIcon className="sidebarIcon" />
              Report
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
