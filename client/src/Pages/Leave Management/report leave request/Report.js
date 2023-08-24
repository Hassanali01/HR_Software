import React from 'react'
import { Row, Col } from 'react-bootstrap'



const Report = ({ Info }) => {

  return (
    <div>
      <div className="container w-100">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div>
          </div>
          <div className="d-flex flex-column justify-content-end align-items-end">
            <div>
              <h3>Leave Application Form</h3>
            </div>
            <div>
              <h3>HR-03/1</h3>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
      {/* Information section */}
      <div className="container w-100">

        {Info.slice(Info.length - 1, Info.length).map((d, i) => {
          return (<>
            <div key={i}>
              <Row className="my-3">
                <Col>
                  <div className="d-flex">
                    <label>Date:</label>
                    <p className="ml-2">
                      {new Date(d.applicationdate).toDateString()}
                    </p>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="d-flex">
                    <label>Employee Id:</label>
                    <p className="ml-2">{d.empid}</p>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="d-flex">
                    <label>Job Location:</label>
                    <p className="ml-2">Lahore</p>
                  </div>
                </Col>
              </Row>
              <Row className="">
                <Col>
                  {" "}
                  <div className="d-flex">
                    <label>Name:</label>
                    <p className="ml-2">{d.name}</p>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="d-flex">
                    <label>Designation:</label>
                    <p className="ml-2">{d.designation}</p>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="d-flex">
                    <label>Departments:</label>
                    <p className="ml-2">{d.department}</p>
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <hr></hr>
              <div>
                <label style={{ fontSize: '15px', fontWeight: 'semi-bold' }}>Leave Reason:</label>&nbsp; {d.reason}<hr></hr>
              </div>
              <div>
                <label style={{ fontSize: '15px', fontWeight: 'semi-bold' }}>Contact details during leave:</label>&nbsp; <hr></hr>
              </div>
              <div>
                <div>
                  <label style={{ fontSize: '15px', fontWeight: 'semi-bold' }}>Backup Resource:</label><br></br>
                  <div className='d-flex justify-content-between align-items-center' style={{ width: '50%' }}>
                    <div>
                      <label>Employee ID:</label>&nbsp;
                    </div>
                    <div><label>Name:</label>&nbsp;</div>
                    <div><label>Designation:</label>&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
            <div />
          </>);
        })}

        <table className="table-striped table-bordered  hover mt-3 container w-100 text-left">
          <thead>
            <tr>
              <th scope="col" className="py-2 px-2 ">Emp Id</th>
              <th scope="col" className="py-2 px-2">Emp Name</th>
              <th scope="col" className="py-2 px-2">Leave Type</th>
              <th scope="col" className="py-2 px-2">from</th>
              <th scope="col" className="py-2 px-2">to</th>
              <th scope="col" className="py-2 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {Info.slice(Info.length - 1, Info.length).map((d, i) => {
              return (
                <>
                  <tr key={i}>
                    <td className="text-left py-2 px-2">{i + 1}</td>
                    <td className="text-left py-2 px-2">{d.name}</td>
                    <td className="text-left py-2 px-2">{d.leaveType}</td>
                    <td className="text-left py-2 px-2">{new Date(d.from).toDateString()}</td>
                    <td className="text-left">{new Date(d.to).toDateString()}</td>
                    <td className="text-left"><span className={`${d.status === 'Pending Approval' ? "badge badge-warning" : d.status === "Approved" ? "badge badge-success" : d.status === "Reject" ? "badge badge-danger" : ""} border-0`}>{d.status}</span></td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <div className="mt-5 my-1"><h5 style={{ fontSize: "19px", fontWeight: "semi-bold" }}>Leave History(last 4 leaves)</h5></div>
        <table className="table-striped table-bordered  hover mt-3 container w-100 text-left">
          <thead>
            <tr>
              <th scope="col" className="py-2 px-2">Emp Id</th>
              <th scope="col" className="py-2 px-2">Emp Name</th>
              <th scope="col" className="py-2 px-2">Leave Type</th>
              <th scope="col" className="py-2 px-2">from</th>
              <th scope="col" className="py-2 px-2">to</th>
              <th scope="col" className="py-2 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {Info.slice(Info.length - 4, Info.length).map((d, i) => {
              return (
                <>
                  <tr key={i}>
                    <td className="text-left py-2 px-2">{i + 1}</td>
                    <td className="text-left py-2 px-2">{d.name}</td>
                    <td className="text-left py-2 px-2">{d.leaveType}</td>
                    <td className="text-left py-2 px-2">{new Date(d.from).toDateString()}</td>
                    <td className="text-left py-2 px-2">{new Date(d.to).toDateString()}</td>
                    <td className="text-left py-2 px-2"><span className={`${d.status === 'Pending Approval' ? "badge badge-warning" : d.status === "Approved" ? "badge badge-success" : d.status === "Reject" ? "badge badge-danger" : ""} border-0`}>{d.status}</span></td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Report