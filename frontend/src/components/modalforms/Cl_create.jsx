import React from "react";
import "./modal.css";
import Inteam from "./Inteam";
import Inclient from "./Inclient";
import { ImCross } from "react-icons/im";
import Rd_team from "./Rd_team";
import Rd_clients from "./Rd_clients";

const cl_create = ({ active, SetActive, parser }) => {
  const choose = () => {
    if (parser == "inteam") {
      return <Inteam />;
    } else if (parser == "inclient") {
      return <Inclient />;
    } else if (parser == "readteam") {
      return <Rd_team />;
    } else if (parser == "readclient") {
      return <Rd_clients />;
    }
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => SetActive(false)}
    >
      <div className="container modal_container">
        <div className="content" onClick={(e) => e.stopPropagation()}>
          <ImCross onClick={() => SetActive(false)} className="move-right" />
          {choose()}
        </div>
      </div>
    </div>
  );
};

export default cl_create;
