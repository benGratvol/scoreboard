import React, { useContext } from "react";
import Createuser from "../createuser_comp/createuser";

import UserContect from "../../context/user_context";
// import Aff from "./Aff_comp/aff";
// import Pross from "./pross_comp/prosser";
// import IPWhitelist from "./Whiteliist_comp/whitelist";
// import Brands from "./Brand_comp/brand";

import GenericAdd from "./Generic_Components/Generic_Add/add";

import "./overseer.css";

export default () => {
  const [val] = useContext(UserContect);

  console.log(`in Overeer`, val);
  return (
    <div>
      <form>
        <div className="over-wraper">
          <div>
            <p>Add Affiliate</p>
            <GenericAdd
              token={val.token}
              Url={"/setings/addaff"}
              add={{ aff: "" }}
            />
            <p>Add Processors</p>
            <GenericAdd
              token={val.token}
              Url={"/setings/addprosseor"}
              add={{ processors: "" }}
            />
            <p>Add Brand</p>
            <GenericAdd
              token={val.token}
              Url={"/setings/addbrand"}
              add={{ brandname: "" }}
            />
            <p>whitelis</p>
            <GenericAdd
              token={val.token}
              Url={"/blacklist/addIP"}
              add={{ ip: "" }}
            />
          </div>
          <Createuser token={val.token} />
        </div>
      </form>
    </div>
  );
};
