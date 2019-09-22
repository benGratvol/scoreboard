import React, { useState, useEffect, useContext } from "react";

import ScoreTabil from "../Table_comp/table";
import DepositAffect from "./deposit_efect_comp/deposit_ef";
import UserContext from "../../context/user_context";

import "./scorebored.css";

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}
//lastDep

export default () => {
  const [val] = useContext(UserContext); // ---> use this
  const [timer, settimer] = useState(0);
  const [depAffect, setDepAffect] = useState(false);

  const [dayley, setDayley] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [theTotal, setTheTotal] = useState(0);
  const [TotalDaily, setTotalDaily] = useState(0);
  const [LastDeposit, setLastDeposit] = useState({});
  let Total = 0;

  useEffect(() => {
    let time = 0;
    let total = 0;
    let runone = true;
    const url = `/stats/getTeamDeposits/${val.user.team}`;
    const timer = setInterval(() => {
      time = time + 3;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log("data................");
          total = data.data.monthly.reduce((acc, curr) => {
            return acc + curr.total;
          }, 0);

          if (total > Total) {
            if (runone) {
              Total = total;
              runone = false;
              setDayley(data.data.daily);
              setMonthly(data.data.monthly);
              setLastDeposit(data.data.lastDep);
              setTheTotal(Total);
              const toaldayle = data.data.daily.reduce(
                (acoume, num) => (acoume = acoume + num.total),
                0
              );
              setTotalDaily(toaldayle);
            } else {
              setDepAffect(true);
              setDayley(data.data.daily);
              setMonthly(data.data.monthly);
              setLastDeposit(data.data.lastDep);
              Total = total;
              time = 0;
              setTheTotal(Total);
              const toaldayle = data.data.daily.reduce(
                (acoume, num) => (acoume = acoume + num),
                0
              );
              setTotalDaily(toaldayle);
              setTimeout(() => {
                setDepAffect(false);
              }, 10000);
            }
          } else {
          }
        });
      settimer(time);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <h3>Team : {val.user.team}</h3>
      <h3>Daily Toatl : {TotalDaily} $</h3>
      <div className="">
        {depAffect ? (
          <DepositAffect agent={LastDeposit.agent} />
        ) : (
          <div className="bord-wraper">
            <ScoreTabil
              prop={{
                bordname: "Daily-Deposit",
                coller: "green",
                data: dayley
              }}
            />
            <ScoreTabil
              prop={{
                bordname: "Monthly-Deposit",
                coller: "blue",
                data: monthly
              }}
            />
          </div>
        )}
      </div>
      <br />
      <h3>
        Total Deposit {theTotal} $: Last Deposit | {secondsToHms(timer)} | by :{" "}
        <label className="scor_agent">{LastDeposit.agent}</label> Amount :
        {LastDeposit.amount_in_usd ? LastDeposit.amount_in_usd.toFixed(2) : 0} $
      </h3>
    </div>
  );
};
