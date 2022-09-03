import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rd_clients from "../modalforms/Rd_clients";
import Rd_team from "../modalforms/Rd_team";

import "./main.css";
import "../modalforms/modal.css";

const CList = () => {
  let { id } = useParams();
  //console.log(id);

  function check() {
    if (id === "readclient") {
      return <Rd_clients />;
    }

    if (id === "readteam") {
      return <Rd_team />;
    }
  }
  return (
    <section>
      <div className="container">{check()}</div>
    </section>
  );
};

export default CList;
