import React, { useContext } from "react";
import Createuser from "../createuser_comp/createuser";

import UserContect from "../../context/user_context";
import Aff from "./Aff_comp/aff";
import Pross from "./pross_comp/prosser";
import IPWhitelist from "./Whiteliist_comp/whitelist";
import Brands from "./Brand_comp/brand";

import "./overseer.css";

export default () => {
  const [val] = useContext(UserContect);

  console.log(`in Overeer`, val);
  return (
    <div>
      <form>
        <div className="over-wraper">
          <div>
            <Aff token={val.token} />
            <Brands token={val.token} />
            <Pross token={val.token} />
            <IPWhitelist token={val.token} />
          </div>
          <Createuser token={val.token} />
        </div>
      </form>
    </div>
  );
};
