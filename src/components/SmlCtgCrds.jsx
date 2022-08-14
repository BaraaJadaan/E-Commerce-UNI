import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './Styles/SmlCtgCrds.css';
import {
  Link,
} from "react-router-dom";
import { allCategories } from '../Data';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
import React, { Component } from 'react';

export default class SwipeToSlide extends Component {
  render() {
    const settings = {
      className: 'margin',
      infinite: false,
      slidesToShow: 6,
      swipeToSlide: true,
      nextArrow: <ArrowForwardIosIcon color='secondary' />,
      prevArrow: <ArrowBackIosNewIcon color='secondary' />
    };
    return (
      <div style={{ margin: '50px' }}>
        <h1 className="ti">Categories</h1>
        <div>
          <Slider {...settings}>
            {allCategories.map((image) => {
              return ( 
                <Link to={`/ProductList/${image.id}`}>
                <div className="item">
                  <img className="image pop" draggable={false} src={image.img} />
                </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}
