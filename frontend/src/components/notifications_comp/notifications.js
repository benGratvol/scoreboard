import React, { useState, useContext, useEffect } from "react";
import NotificationsContext from "../../context/notifications_context";

/* ****************** NEED TO DO **************
   1) fix fade in / out affect 
*/

import "./notifications.css";
export default () => {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState("");
  const [msg, setMsg] = useContext(NotificationsContext);
  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (msg.type) {
      case "Sucsses":
        setStyle("sucsses");
        break;
      case "Fail":
        setStyle("fail");
        break;
      case "Warning":
        setStyle("warning");
        break;
      case "Info":
        setStyle("info");
        break;
    }
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }, [msg, setMsg]); // new 13/10
  return (
    <div className={visible ? "fadeIn" : "fadeOut"}>
      {visible ? (
        <div className={style}>
          <div>
            <h4>{msg.type}</h4>
            <br />
            <p>{msg.body}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
