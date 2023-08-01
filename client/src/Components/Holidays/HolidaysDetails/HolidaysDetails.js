import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Moment from "react-moment";
import { Button } from "react-bootstrap";

const HolidaysDetails = () => {
  const url = "/holiday/detail";

  const [holiday, setholiday] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      setholiday(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Table className="striped bordered hover">
        <thead>
          <tr>
            <th>Sr #</th>
            <th>Calendar Name</th>
            <th>Holiday Name</th>
            <th>Holiday Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {holiday.map((d, currElem) => {
            return (
              <>
                <tr key={currElem}>
                  <td>{d.srno}</td>
                  <td>
                    {d.calendarId.calendarname
                      ? d.calendarId.calendarname
                      : "-"}
                  </td>
                  <td>{d.title}</td>
                  {/* for getting date we can also use{new Date(post.createdAt).toDateString()} */}
                  <td>
                    <Moment format="DD/M/YYYY">{d.holidaydate}</Moment>
                  </td>
                  <td>
                    {d.status ? (
                      <Button style={{ backgroundColor: "green" }}>
                        Active
                      </Button>
                    ) : (
                      <Button style={{ backgroundColor: "red" }}>Expire</Button>
                    )}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default HolidaysDetails;
