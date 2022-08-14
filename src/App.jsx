import './App.css';
import Home from "./Pages/Home";
import ProductPage from './Pages/ProductPage'
import NavBar from './components/NavBar';
import LoginSignUp from "./Pages/LoginSignUp/LoginSignUp"
import ProductList from './Pages/ProductList';
import Cart from './Pages/Cart/Cart';
import WishList from './Pages/WishList/WishList'
import { Cartiteme } from "./components/data";
import { useState } from 'react';
import ScrollToTop from "./components/ScrollToTop";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import AdminPage from './Pages/AdminPage/AdminPage';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setwishItems] = useState([]);
  const [userType,setUserType] = useState(`${localStorage.getItem('userType')}`)
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
 
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  const onAddWish = (product) => {
    // const exist = wishItems.find((x) => x.id === product.id);
 
    // if (exist) {
    //   setwishItems(
    //     wishItems.map((x) =>
    //       x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
    //     )
    //   );
    // } else {
      setwishItems([...wishItems, { ...product, qty: 1 }]);
    
  };
  const onRemoveWish = (product) => {
    
    // const exist = wishItems.find((x) => x.id === product.id);
    // if (exist.qty === 1) {
      setwishItems(wishItems.filter((x) => x.id !== product.id));
    // } else {
    //   setwishItems(
    //     wishItems.map((x) =>
    //       x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
    //     )
    //   );
    
  };
  return (
  
    <div className="App">
      <BrowserRouter>
      <ScrollToTop>
      {/* <NavBar/> */}
        <Routes>
          <Route path="/" element={<Home wishItems={wishItems} cartItems={cartItems} onAddWish={onAddWish}  onAdd={onAdd}/>} />
          <Route exact path="/Login" element={<LoginSignUp />} />
          <Route exact path="/Cart" element={<Cart onAdd={onAdd} onRemove={onRemove} wishItems={wishItems}  cartItems={cartItems} />} />

          <Route exact path="/ProductList/:id" element={<ProductList cartItems={cartItems} wishItems={wishItems} onAddWish={onAddWish} onAdd={onAdd} />} />
          <Route exact path="/ProductList" element={<ProductList cartItems={cartItems} wishItems={wishItems} onAddWish={onAddWish} onAdd={onAdd} />} />

          <Route exact path="/DetailsProducts/:id"  element={<ProductPage wishItems={wishItems} cartItems={cartItems}/>} />
        

          <Route exact path="/MyProfile" element={<ProfilePage cartItems={cartItems} wishItems={wishItems} />} />
          <Route exact path="/MyProfile/:id" element={<ProfilePage cartItems={cartItems} wishItems={wishItems} />} />

          <Route exact path="/WishList" element={<WishList onAddWish={onAddWish} onRemoveWish={onRemoveWish} wishItems={wishItems} cartItems={cartItems} />} />
          {localStorage.getItem('userType')!='USR' &&
          <Route exact path="/Admin" element={<AdminPage cartItems={cartItems} wishItems={wishItems} />} />
          }
        </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  
  );
}

export default App;
