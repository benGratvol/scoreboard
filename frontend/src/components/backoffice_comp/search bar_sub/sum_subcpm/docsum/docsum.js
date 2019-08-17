import React, { useState, useEffect } from "react";

import Net from "../../../../../Utils/networking";
import "./docsum.css";

import DocsIcon from "../../../../../assets/images/icons/docs_2.png";

export default () => {
  const [sumDocs, setsumDocs] = useState({});

  useEffect(() => {
    (async () => {
      const url = "/backoffice/sumDocs";
      const jsonObj = await Net.useFetch(url);
      console.log(jsonObj.data);
      setsumDocs(jsonObj.data);
    })();
  }, []);
  return (
    <div className="Docs_sum">
      <h4>
        {/* <img src={DocsIcon} /> */}
        Docs
      </h4>
      <p>Total : {sumDocs.totalDocs} </p>
      <p>Has Docs : {sumDocs.hasDocs} </p>
      <p>Sent Request : {sumDocs.sentreq} </p>
    </div>
  );
};
