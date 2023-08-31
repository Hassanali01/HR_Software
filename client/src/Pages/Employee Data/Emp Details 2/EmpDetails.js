import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cards from "./Card";
import "./card.css";

const EmpDetails = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [emp, setEmp] = useState({});

  useEffect(() => {
    const fetchEmp = async () => {
      const res = await axios.get(process.env.React_APP_ORIGIN_URL + "employees/" + path);
      setEmp(res.data);
    };
    fetchEmp();
  }, [path]);


  return (
    <>
      <div className="content-wrapper" style={{ backgroundColor: "#f7f7f7", marginTop: "30px" }}>
        <section className="content">
          <div className="content-fluid">
            <div className="row gy-3 justify-content-center">
              <div className="col-md-10 col-sm-10 col-12 col-lg-10 col-xl-10 ">
                <Cards data={emp} />
                <div />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EmpDetails;
