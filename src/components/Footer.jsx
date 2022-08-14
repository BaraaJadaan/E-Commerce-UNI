import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import Divider from '@mui/material/Divider';
import styled from "styled-components";
import "./Styles/Footer.css";
import { mobile } from "../Responsive";
import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
  background-color: indigo;
  color: white;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  
`;

const Logo = styled.h1`
transform: translate(0ch, 0ch);
margin-top: 35px;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-size: 23px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <div>
    <Divider sx={{p:5, width: 1}}/>
    <Container className='large'>
      <Left>
        <Logo className='font5'>OneForAll</Logo>
        <Desc>
          
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FacebookRoundedIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <TwitterIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>All Categories</ListItem>
          <ListItem>Laptops</ListItem>
          <ListItem>Wearings</ListItem>
          <ListItem>Games</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Accesories</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Televisions</ListItem>
          <ListItem>About Us</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocalPhoneRoundedIcon style={{marginRight:"10px"}}/> +963997748481
        </ContactItem>
        <ContactItem>
          <MailOutlineRoundedIcon style={{marginRight:"10px"}} /> oneforall@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
    </div>
  );
};

export default Footer;
