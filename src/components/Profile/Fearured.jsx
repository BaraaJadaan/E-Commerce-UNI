import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import "../Styles/featured.css";
import AuthContext   from "../../hooks/AuthProvider";
import { useContext } from "react";
export default function Fearured() {
  const {search,ip} = useContext(AuthContext)

  return (
    <div className="featured">
      <div className="featureditems">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredcontainer">
          <span className="featuredMony">11,6$</span>
          <span className="featuredMonyRate">
            -2,2 <ArrowDownward  className="featuredIcon Nagative" />
          </span>
        </div>
        <div className="featuredsub">Compare to last month</div>
      </div>
      <div className="featureditems">
        <span className="featuredTitle">Sales</span>
        <div className="featuredcontainer">
          <span className="featuredMony">13,6$</span>
          <span className="featuredMonyRate">
            -0,2 <ArrowDownward  className="featuredIcon Nagative" />
          </span>
        </div>
        <div className="featuredsub">Compare to last month</div>
      </div>
      <div className="featureditems">
        <span className="featuredTitle">Cost</span>
        <div className="featuredcontainer">
          <span className="featuredMony">12 $</span>
          <span className="featuredMonyRate">
            0,3 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <div className="featuredsub">Compare to last month</div>
      </div>
    </div>
  );
}
