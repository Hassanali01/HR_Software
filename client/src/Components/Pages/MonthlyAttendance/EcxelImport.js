import React, { Component } from 'react'
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import './ecxel.css'
export class EcxelImport extends Component {
  state = {
    cols: [],
    rows: []
  };
  uploadFile = event => {
    console.log("hello world")
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const { cols, rows } = resp;
        this.setState(
          {
            cols: cols,
            rows: rows
          },
          () => {
            const data = [...rows];
            data.shift();
            this.props.uploadHandler(data);
          }
        );
      }
    });
  };


  render() {


    return (
      <div className="excel-import-container" >
        <div className="file-upload" style={{backgroundColor:"white"}}>
          {/* <label>Upload Excel File</label> */}
          <input type="file" onChange={this.uploadFile} />
          <button style={{width:"200px"}}>Upload Excel File</button>
        </div>

      </div>

    )
  }
}

export default EcxelImport
