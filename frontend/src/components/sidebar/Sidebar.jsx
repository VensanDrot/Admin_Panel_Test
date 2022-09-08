import "./sidebar.scss";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import CL_create from "../modalforms/Cl_create";

const Sidebar = () => {
  const [cl_create_st, setCl_Create] = useState(false);
  const [parser, setParser] = useState("");
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Главная</p>
          <Link to="/">
            <li>
              <DashboardIcon className="icon" />
              <span>Панель управления</span>
            </li>
          </Link>
          <p className="title">Возможности</p>
          <a
            onClick={() => {
              setCl_Create(true);
              setParser("inteam");
            }}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Добавить сотрудника</span>
            </li>
          </a>
          <a
            onClick={() => {
              setCl_Create(true);
              setParser("inclient");
            }}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Добавить клиента</span>
            </li>
          </a>
          <Link to="/List/readteam" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Список сотрудников</span>
            </li>
          </Link>
          <Link to="/List/readclient" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Список клиентов</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
      <CL_create
        active={cl_create_st}
        SetActive={setCl_Create}
        parser={parser}
      ></CL_create>
    </div>
  );
};

export default Sidebar;
