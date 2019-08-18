import React, { useState, useEffect } from "react";

import Net from "../../../../../Utils/networking";
import "./verifisum.css";
import VerIcon from "../../../../../assets/images/icons/verfiy.png";

export default () => {
  const [sumVerifi, setsumVerifi] = useState({});

  useEffect(() => {
    (async () => {
      const url = "/backoffice/verifi";
      const jsonObj = await Net.useFetch(url);
      console.log(jsonObj.data);
      setsumVerifi(jsonObj.data);
    })();
  }, []);
  return (
    <div className="Verifi_sum">
      <h4> {/* <img src={VerIcon} /> Verifi */}Verified</h4>
      <p>
        Verifid : {((sumVerifi.verifid / sumVerifi.total) * 100).toFixed(2)}%{" "}
      </p>
      <p>
        Pending : {((sumVerifi.pending / sumVerifi.total) * 100).toFixed(2)}%{" "}
      </p>
      <p>
        Not Verifid :{" "}
        {((sumVerifi.notverifid / sumVerifi.total) * 100).toFixed(2)}%{" "}
      </p>
      <p>CHB : {((sumVerifi.chb / sumVerifi.total) * 100).toFixed(2)}% </p>
    </div>
  );
};
