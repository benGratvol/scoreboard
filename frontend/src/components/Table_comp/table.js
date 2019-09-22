import React from "react";

import crown from "../../assets/images/crown.png";
import "./table.css";
// [ { agent: 'agent2', total: 400, count: 2 },
//   { agent: 'agent3', total: 400, count: 2 },
//   { agent: 'best agent', total: 1200, count: 4 } ]
export default prop => {
  const { bordname, coller, data } = prop.prop;
  return (
    <div>
      <div className="deposits">
        <h2 className="bord_name">{bordname}</h2>
        <table style={{ backgroundColor: `${coller}` }}>
          <thead>
            <tr>
              <th>Agent</th>
              <th>Deposit</th>
              <th>Total</th>
            </tr>
          </thead>
          {data === undefined ? (
            <></>
          ) : (
            data.map((agent, index) => {
              if (index === 0) {
                return (
                  <tr style={{ backgroundColor: `light${coller}` }}>
                    <td>
                      <img alt="crown" className="leftimage" src={crown} />
                      {agent.agent}
                    </td>
                    <td>{agent.total} $</td>
                    <td>
                      {agent.count}
                      <img alt="crown" className="rightimage" src={crown} />
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr style={{ backgroundColor: `light${coller}` }}>
                    <td>{agent.agent}</td>
                    <td>{agent.total} $</td>
                    <td>{agent.count}</td>
                  </tr>
                );
              }
            })
          )}
        </table>
      </div>
    </div>
  );
};
