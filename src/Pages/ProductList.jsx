
import Navbar from "../components/NavBar";
import Announcement from "../components/Announcement";
import Products from '../components/Products';
// import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import AuthContext   from "../hooks/AuthProvider";
import Typography from '@mui/material/Typography';
import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";
import { useParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    success: {
      main: teal[700],
    },
  },
});
// import Stack from '@mui/material/Stack';
const Container = styled.div``;
const Wrapper = styled.div`

  min-height: 100vh;
`;

const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
 
`;
const FilterRange = styled.div`
display: flex;
align-items: center;
margin: 20px;
width:30%;
`;
const TextFilter = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  display:flex;
  align-items: center;
  justify-content: center;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  color:black;
  border-radius:20px;
  background-color : #EEEBDD;
  font-weight:500;
`;
const Option = styled.option`

`;

const PaginationWrapp = styled.div`
display:flex;
align-items:center;
justify-content: center;
margin-bottom: 6px;
`
function valuetext(value) {
  return `${value}$`;
}
const ProductList = ({onAdd,cartItems,onAddWish,wishItems}) => {
 const {search,ip} = useContext(AuthContext)
 const {id}= useParams();
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1);
  const [value, setValue] = useState([0, 2000]);
const [order, setOrder] = useState("")
  const handleRange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    if(id==null&&search==""&&(value[0]==0&&value[1]==1000)&&order==""){
    fetchProducts();
    }
   else if(id==null&&search!=""){
    fetchProductSearch()
   }
   else if(id==null&&(value[0]!=0||value[1]!=1000)||order!=""){
    fetchProductRange()
   }
    else{
      fetchCategory();
    }
    }, [search,page,value,order])
    const fetchProducts = async () => {
      await axios.get(`${ip}/api/products/?page=${page}`).then(({ data }) =>
      {

        //  console.log(data)
        setProducts(data.data)}
        )
      }
      const fetchProductSearch = async () => {
        await axios.get(`${ip}/api/products/${search}`).then(({ data }) =>
        {
          // console.log(data)
          setProducts(data)
          }
          )
        }
        const fetchProductRange = async () => {
          await axios.get(`${ip}/api/product?price_from=${value[0]}&&price_to=${value[1]}&&sortOrder=${order}`).then(({ data }) =>
          {
             setProducts(data.data)
            console.log(data.data)
            }
            )
          }
    const fetchCategory = async () => {
      await axios.get(`${ip}/api/productsCat?category=${id}&sortOrder=${order}`).then(({ data }) =>
      {
         console.log(data)
        setProducts(data.data)
      }
        )
      }
    
console.log(id)
  return (
      <ThemeProvider theme={theme}>
    <Container>
      <Navbar cartItems={cartItems} wishItems={wishItems}/>
      <Announcement />
      <Wrapper>
      <Title>Filtering</Title>
      <FilterContainer>
        <Filter>
     
          <TextFilter>Sort Products:</TextFilter>
          <Select onChange={e=>setOrder(e.target.value)}>
            <Option selected>desc</Option>
            <Option  >asc</Option>
          </Select>{" "}
        </Filter>
       {!id &&<FilterRange>
          <TextFilter>Range Price</TextFilter>
          <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleRange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        color="success"
        max={2000}
      />
          
        </FilterRange>
}
        
      </FilterContainer>


   
      <Products products={products} onAddWish={onAddWish}  onAdd={onAdd}  />
     {!search&& <PaginationWrapp>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </PaginationWrapp>}
      {/* <Newsletter /> */}
      </Wrapper>
      <Footer />
    </Container>
    </ThemeProvider>
  );
};

export default ProductList;
