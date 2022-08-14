import React from 'react';
import Slide from 'react-reveal/Slide';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Styles/Slider.css';
import {
  Link,
} from "react-router-dom";
import { bigSlider } from '../Data';
import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
const responsiveImageHero = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Slider2() {
  return (
    <Slide>
      <Carousel
        className="slide"
        showDots
        infinite
        containerClass="container"
        slidesToSlide={1}
        responsive={responsiveImageHero}
      >
        {/* {bigSlider.map((image) => {
          return (
            <Link to={`/ProductList/${image.id}`}>
            <img
              draggable={true}
              src={image.img}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                margin: 'auto',
              }}
            />
            </Link>
          );
        })} */}
        <Link to={`/ProductList/3`}>
            <img
              draggable={true}
              src="https://i.ibb.co/TLQN2fZ/Webpnet-resizeimage-3.png"
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                margin: 'auto',
              }}
            />
          </Link>
        <Link to={`/ProductList/8`}>
            <img
              draggable={true}
              src={"https://i.ibb.co/LN8XssY/Webpnet-resizeimage-2.png"}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                margin: 'auto',
              }}
            />
          </Link>
        <Link to={`/ProductList/6`}>
            <img
              draggable={true}
              src={"https://i.ibb.co/k1ygd1Q/Webpnet-resizeimage-1.png"}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                margin: 'auto',
              }}
            />
          </Link>
        <Link to={`/ProductList/13`}>
            <img
              draggable={true}
              src={"https://i.ibb.co/tLq73cs/Webpnet-resizeimage-4.png"}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                margin: 'auto',
              }}
            />
          </Link>
      </Carousel>
    </Slide>
  );
}
