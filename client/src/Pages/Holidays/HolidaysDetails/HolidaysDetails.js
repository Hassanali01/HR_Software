import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import {  Form } from "react-bootstrap";
import { NotificationManager } from 'react-notifications'
import DatePicker from 'react-datepicker';


const HolidaysDetails = () => {
  let srno = 1
  const [savedate, setSavedate] = useState(new Date());
  const [holiday, setholiday] = useState([]);
  const ChangeYear = (e) => {
    const dateStr = e;
    setSavedate(dateStr)
  }

  const holidaydelete = async (id) => {
    try {
      const del = await axios.delete(process.env.React_APP_ORIGIN_URL + `holiday/${id}`)
      NotificationManager.success("Successfully Deleted")
    }
    catch {
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(process.env.React_APP_ORIGIN_URL + `holiday/${savedate}`);
      setholiday(response.data)
    } catch (error) {
      setholiday([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [savedate]);

  return (
    <>
      <div className="datepicker" style={{ cursor: 'pointer', display: 'flex', marginBottom: '20px' }}>
        <Form.Label style={{ width: '120px' }}>Select Year  : </Form.Label>
        <DatePicker
          id="DatePicker"
          type="string"
        
          selected={savedate}
          className="text-primary text-center"
          onChange={ChangeYear}
          showYearPicker
          dateFormat="yyyy"
          yearItemNumber={10}
          value={savedate}
        />
      </div>

      <Table className="striped bordered hover">
        <thead>
          <tr>
            <th>Sr #</th>
            <th>Holiday Name</th>
            <th>From</th>
            <th>to</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {holiday.length > 0 ?
            (holiday && holiday.map((d, currElem) => {

              return (
                <>
                  <tr key={d._id}>
                    <td>{srno++}</td>
                    <td>
                      {d.title}
                    </td>
                    <td>{moment(d.from).utc().format('YYYY-MM-DD')}</td>
                    <td>
                      {moment(d.to).utc().format('YYYY-MM-DD')}
                    </td>
                    <td>
                      <i  
                      class=" fa-regular fa-trash-can" 
                      style={{ color: 'red',fontSize: "20px", cursor: 'pointer', float: "center"}}
                      title="Delete"
                      onClick={() => holidaydelete(d._id)}
                      ></i>
                    </td>
                  </tr>
                </>
              );
            })) : (
              <tr>
                <td colSpan={5}>
                  <p style={{ textAlign: "center", fontSize: "22px", fontWeight: "900" }}>No data for this Year...</p>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </>
  );
};

export default HolidaysDetails;
