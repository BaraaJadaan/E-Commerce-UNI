import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
  font-weight: 700;
  font-size: medium;
  margin-top: 64px;
`;

const Announcement = () => {
  const {search,ip} = useContext(AuthContext)

  const [data, setData] = useState("")

  useEffect(() => {
    fetchUsers();
    }, [])
    const fetchUsers = async () => {
      await axios.get(`${ip}/api/announcmment`).then(({ data }) =>
      {
      
         console.log(data)
        // setProducts(data.data)}
        setData(data[0].announcmment)
      })}
  return <Container>{data}</Container>;
};

export default Announcement;