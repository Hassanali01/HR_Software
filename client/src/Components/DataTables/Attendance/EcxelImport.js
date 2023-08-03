import React, { Component } from "react";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import "./ecxel.css";
import Button from "react-bootstrap/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

export class EcxelImport extends Component {
  state = {
    cols: [],
    rows: [],
  };
  uploadFile = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      
      } else {
        const { cols, rows } = resp;
        this.setState(
          {
            cols: cols,
            rows: rows,
          },
          () => {
            const data = [...rows];
            data.shift();
            this.props.uploadHandler(data);
            NotificationManager.success("Sucessfully Uploaded")
          }
        );
      }
    });
  };

  render() {
    return (
      // <div className="excel-import-container" >

      // <div className="file-upload" style={{backgroundColor:"white",width:'auto',flexDirection:'row'}}>
      /* <label>Upload Excel File</label> */
      /* <input type="file" onChange={this.uploadFile} style={{width:'auto'}} /> */
      // </div>
      // <div>
      // <button style={{width:"auto",marginTop:'2%'}}>Upload File</button>/

      // </div>
<>
      <Stack gap={3} style={{ marginTop: "0.5%" }}>
        <Form.Label htmlFor="button">
        
          
          {/* <Button variant="secondary" className='me-auto'>Upload file</Button> */}
        
        <Form.Control
          type="file"
          id="button"
          onChange={this.uploadFile}
          style={{ width: "40%", display: "none",backgroundColor:'#17a392',color:'white', }}
        /><span  style={{backgroundColor:'#17a392',color:'white',padding:'8px',borderRadius:'5px' }}>Upload</span></Form.Label>

        {/* <input type="file" placeholder="Add your item here..."   id='button'/> */}

        {/* <div className="vr" /> */}
        {/* <Button variant="outline-danger">Reset</Button> */}
      </Stack>
      <NotificationContainer/>
      </>
      // );
      // }

      // export default FormExample;

      // </div>
    
    );
  }
}

export default EcxelImport;
