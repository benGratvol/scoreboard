import React from "react";
import Createuser from "../createuser_comp/createuser";
import Aff from "./Aff_comp/aff";
import Pross from "./pross_comp/prosser";

import "./overseer.css";

export default () => {
  return (
    <div>
      <form>
        <div className="over-wraper">
          <Aff />
          <Createuser />
          <Pross />
        </div>
      </form>
    </div>
  );
};
