import React, { useState } from "react";

import gife1 from "../../../assets/gifs/money_1.gif";
import gife2 from "../../../assets/gifs/money_2.gif";
import gife3 from "../../../assets/gifs/money_3.gif";
import gife4 from "../../../assets/gifs/money_4.gif";

import crown from "../../../assets/images/crown.png";

import "./deposit_ef.css";

function randomeGif(gifarry) {
  const index = Math.floor(Math.random() * gifarry.length);
  return gifarry[index];
}

export default prop => {
  const agent = prop.agent;
  const [gif] = useState([gife1, gife2, gife3, gife4]);
  return (
    <div>
      <h3 className="deposit_ef_agent">
        {" "}
        <img src={crown} />
        {agent}
        <img src={crown} />
      </h3>

      <div className="deposit_ef-wraper">
        <img src={randomeGif(gif)} alt="gif-holder" />
      </div>
    </div>
  );
};
