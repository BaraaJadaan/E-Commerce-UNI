
import * as React from "react";
import { styled } from "@mui/material/styles";
import "./Styles/NavBar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteIcon from '@mui/icons-material/Favorite';import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { teal } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WishListItem from "../Pages/WishList/WishListItem";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
const theme = createTheme({
  palette: {
    success: {
      main: teal[700],
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  flex: "1",
  position: "relative",
  borderRadius: "20px",
  color: "white",
  backgroundColor: "rgb(255, 255, 255)",
  marginRight: theme.spacing(2),
  marginLeft: 0,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: "indigo",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "15ch",
  },
}));

export default function NavBar({cartItems,wishItems}) {
  const { setSearch } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
    <AppBar style={{ backgroundColor: "indigo" }}>
      <Toolbar variant="regular">
        <Sidebar />
        <Link to={"/ProductList"} style={{ textDecoration: "none" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase
          onChange={e=>setSearch(e.target.value)}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        </Link>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <h1 class="font5">OneForAll</h1>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Link to={"/Cart"} style={{ textDecoration: "none" }}>
        <IconButton size="large" color="inherit">
        <Badge badgeContent={cartItems.length} color="success">

          <ShoppingCartRoundedIcon />
          </Badge>
        </IconButton>
        </Link>
        <Link to={"/WishList"} style={{ textDecoration: "none" }}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={wishItems.length} color="success">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        </Link>
        {localStorage.getItem('accessToken')&&
        <Link to={"/MyProfile"}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
      
        
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        </Link>}
        {!localStorage.getItem('accessToken')&&
        <Link to={"/Login"}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
      
        
          color="inherit"
        >
          <LoginRoundedIcon />
        </IconButton>
        </Link>}
      </Toolbar>
      {renderMenu}
    </AppBar>
    </ThemeProvider>
  );
}
