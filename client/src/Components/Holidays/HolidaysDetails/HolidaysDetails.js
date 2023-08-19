import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Moment from "react-moment";
import moment from "moment";
import { Button, Form } from "react-bootstrap";
import { NotificationManager } from 'react-notifications'
import Calendar from 'react-calendar';
import DatePicker from 'react-datepicker';





const HolidaysDetails = () => {
  let srno = 1
  const url = "/holiday/detail";
  const [savedate, setSavedate] = useState(new Date());
  const [holiday, setholiday] = useState([]);
  const [holidayyear, setHolidayyear] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(url);
  //     const data = response.data.detail;
  //     setholiday(data);
  //     // console.log(holiday)
  //   } catch (error) {
  //   }
  // };


  const ChangeYear = (e) => {
    const dateStr = e;
    const year = new Date(dateStr).getFullYear();
    setSavedate(dateStr)


  }



  const holidaydelete = async (id) => {
    try {
      const del = await axios.delete(`/holiday/${id}`)
      NotificationManager.success("Successfully Deleted")
    }
    catch {
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`holiday/${savedate}`);

      console.log("res", response.data)

      setholiday(response.data)

    } catch (error) {
      setholiday([]);
      console.error('Axios error:', error);
    }

  };


  useEffect(() => {

    fetchData();

  }, [savedate]);


  return (
    <>
      <Form.Label  style={{ cursor: 'pointer' }}>Select Year : </Form.Label>
      <DatePicker
       style={{ cursor: 'pointer' }}
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
                      <Button onClick={() => holidaydelete(d._id)} style={{ backgroundColor: "red" }}>Delete</Button>
                    </td>
                  </tr>
                </>
              );
            })) : (
              <tr>
                <td colSpan={5}>
                <p  style={{ textAlign: "center", fontSize: "22px" , fontWeight: "900" }}>No data for this Year...</p>
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
