import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/WidgetProducts.css";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
export default function WigetProducts() {
  const {search,ip} = useContext(AuthContext)

  const [data, setData] = useState([])
  useEffect(() => {
    fetchfewProducts();
    }, [])
    const fetchfewProducts = async () => {
      await axios.get(`${ip}/api/admin/lastproduct`,
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('accessToken')}`} }).then(({ data }) =>
      {
        setData(data)
      })}
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Newest Products</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Product</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Price</th>
          <th className="widgetLgTh">Quantity</th>
        </tr>
        {data.map((item)=>(
          <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
               src={`${ip}/storage/product_images/${item.image_url} `}
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">{item.name}</span>
          </td>
          <td className="widgetLgDate">{item.updated_at.split("T",1)}</td>
          <td className="widgetLgAmount">{item.price}</td>
          <td className="widgetLgStatus">
          {item.quantity}
          </td>
        </tr>
        ))}
        
       
      </table>
    </div>
  );
}