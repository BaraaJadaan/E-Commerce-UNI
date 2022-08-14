import styled from 'styled-components';
import { popularProducts } from './data';
import Product from './Product';
import Fade from 'react-reveal/Fade';
import Grid from '@mui/material/Grid';
import ProductFeatured from './ProductFeatured';
import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
const Container = styled.div`  

  
`;

const ProductsFeatured = ({onAdd,onAddWish,products}) => {
  const {search,ip} = useContext(AuthContext)

  return (
    <Container>
      {/* <h1 className="t2">Featured Products</h1> */}
      <Grid container spacing={3}>
        {products.map((item) => (
          <Grid item xs={3}>
            <Fade bottom>
              <ProductFeatured onAdd={onAdd} onAddWish={onAddWish} item={item} key={item.id} />
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsFeatured;
