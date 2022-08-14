import React from 'react'
import "./Styles/CategoryCard.css"
import Grid from '@mui/material/Grid';
import {
  Link,
} from "react-router-dom";
import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
export const CategoryCard = () => {
  const {search,ip} = useContext(AuthContext)

  return (
    <div >
      <h1 className="ti">Popular Categories</h1>
      <Grid sx={{p:1}} className='space' container spacing={1}>
      
        <Grid className='contain' item xs={4}>
          <img className='max zoom'src="https://i.ibb.co/VM8Dr1Z/andras-vas-Bd7g-Nn-WJBk-U-unsplash-min.jpg"/>
          <Link to={`/ProductList/1`}>
            <button className='btn'>Learn More</button>
          </Link>
        </Grid>
        <Grid className='contain' item xs={4}>
          <img className='max zoom' src="https://i.ibb.co/TgjNbvQ/pexels-philip-boakye-2614384-min.jpg"/>
          <Link to={`/ProductList/9`}>
            <button className='btn'>Learn More</button>
          </Link>
        </Grid>
        <Grid className='contain' item xs={4}>
          <img className='max zoom' src="https://i.ibb.co/0yZmkXs/pexels-bekah-allmark-10433622-min.jpg"/>
          <Link to={`/ProductList/3`}>
            <button className='btn'>Learn More</button>
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}
export default CategoryCard;