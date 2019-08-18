import React, { useState, useEffect } from "react";

import Net from "../../../../../Utils/networking";
import "./docsum.css";

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
      <h4>Docs</h4>
      <p>Total : {sumDocs.totalDocs} </p>
      <p>
        No Docs : {((sumDocs.noDocs / sumDocs.totalDocs) * 100).toFixed(2)}%
      </p>
      <p>
        Has Docs : {((sumDocs.hasDocs / sumDocs.totalDocs) * 100).toFixed(2)}%
      </p>
      <p>
        Sent Request :{((sumDocs.sentreq / sumDocs.totalDocs) * 100).toFixed(2)}
        %
      </p>
    </div>
  );
};
